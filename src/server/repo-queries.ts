import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const getUserRepos = async (userId: string) => {
  console.log("FETCHING USER REPOS")
  let repos = [];
  try {
    const response = await getDocs(
      collection(db, `users/${userId}/repositories`)
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
