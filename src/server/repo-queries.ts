import axios from "axios";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

const getUserRepos = async (userId: string) => {
  console.log("FETCHING USER REPOS");
  let repos = [];
  try {
    const userDocName = process.env.NEXT_PUBLIC_DB_USERS_DOC as string;
    const userDoc = await getDoc(doc(db, `${userDocName}/${userId}`));
    const userData = userDoc.data();
    if(userData && userData.firstReqSent === false){
      const githubReposResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/github/repos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const githubRepos = await githubReposResponse.json();
      githubRepos.forEach(async (repo: any) => {
        const formattedRepo = {
          id: repo.id,
          name: repo.name,
          owner: repo.owner.login,
          private: repo.private,
          userId: userId,
          ownerAvatar: repo.owner.avatar_url,
        };
        const repoRef = doc(db, `${userDocName}/${userId}/repositories/${repo.id}`);
        await setDoc(repoRef, formattedRepo);
      });
      await updateDoc(doc(db, `${userDocName}/${userId}`), {
        firstReqSent: true,
      });

    }
    const response = await getDocs(
      collection(db, `${userDocName}/${userId}/repositories`)
    );
    repos = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
      name: doc.data().name,
      owner: doc.data().owner,
      ownerAvatar: doc.data().ownerAvatar,
      private: doc.data().private,
    }));
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
  return repos;
};

export { getUserRepos };
