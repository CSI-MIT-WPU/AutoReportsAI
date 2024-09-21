import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "@clerk/nextjs/server";
import { ratelimit } from "@/lib/ratelimit";

export async function POST(req: Request) {
  try {
    // Assuming you have a way to get the userId from the request (e.g., Clerk session)
    const userId = auth().userId;
    console.log("userId", userId);
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

    // 2. Fetch Repositories from GitHub API
    const response = await fetch(
      "https://api.github.com/user/repos?type=private&sort=pushed",
      {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(`GitHub API Error: ${errorText}`, {
        status: response.status,
      });
    }

    const repos = await response.json();
    await Promise.all(
      repos.map(async (repo: any) => {
        return setDoc(
          // Return the promise from setDoc
          doc(db, `users/${userId}/repositories/${repo.id}`),
          {
            id: repo.id,
            name: repo.name,
            owner: repo.owner.login,
            private: repo.private,
            userId: userId,
            ownerAvatar: repo.owner.avatar_url,
          },
          { merge: true }
        );
      })
    );

    console.log("All repositories saved to Firestore!");
    return new Response(JSON.stringify(repos), {
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
