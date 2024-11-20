import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { ratelimit } from "@/lib/ratelimit";
import { getUserRepos } from "@/server/repo-queries";
import { doc, getDoc, writeBatch } from "firebase/firestore";

async function getPaginatedData(url: string, accessToken: string) {
  const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
  let pagesRemaining = true;
  let data: any = [];
  while(pagesRemaining){
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });
    if(!response.ok){
      throw new Error(`GitHub API Error: ${response.statusText}`);
    }
    const jsonData = await response.json();
    data = [...data, ...jsonData];
    const linkHeader = response.headers.get("Link");
    pagesRemaining = linkHeader !== null && linkHeader.includes(`rel=\"next\"`);
    if(pagesRemaining && linkHeader){
      const match = linkHeader.match(nextPattern);
      if (match) {
        url = match[0];
      }
    }
  }
  return data;
}

export async function POST(req: Request) {
  try {
    // Assuming you have a way to get the userId from the request (e.g., Clerk session)
    const userId = auth().userId;
    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const { success } = await ratelimit.limit("get-repos-" + userId);
    if (!success) throw new Error("Rate limit exceeded");

    // 1. Retrieve Access Token from Firestore
    const userDoc = await getDoc(doc(db, `users/${userId}`));
    if (!userDoc.exists()) {
      return new Response("User not found", { status: 404 });
    }
    const accessToken = userDoc.data().accessToken;

    // 2. Get locally stored repos and repos from GitHub.
    const localRepos = await getUserRepos(userId);
    const githubRepos: Array<any> = await getPaginatedData("https://api.github.com/user/repos?sort=pushed", accessToken);

    const githubRepoSet = new Set(githubRepos.map(repo => repo.id));
    const reposToDelete = localRepos.filter((localRepo) => {
      if (!githubRepoSet.has(localRepo.id)) {
        return localRepo;
      }
    });

    // 3. Perform batch delete in case repo exists in local storage and not on github
    const batch = writeBatch(db);
    reposToDelete.forEach((repo) => {
      const repoRef = doc(db, `users/${userId}/repositories/${repo.id}`);
      batch.delete(repoRef);
    });

    // 4. Add/Update document in local storage
    githubRepos.map((repo) => {
      const formattedRepo = {
        id: repo.id,
        name: repo.name,
        owner: repo.owner.login,
        private: repo.private,
        userId: userId,
        ownerAvatar: repo.owner.avatar_url,
      };
      const repoRef = doc(db, `users/${userId}/repositories/${repo.id}`);
      batch.set(repoRef, formattedRepo);
    });

    await batch.commit();

    console.log("All repositories saved to Firestore!");
    return new Response(JSON.stringify(githubRepos), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
