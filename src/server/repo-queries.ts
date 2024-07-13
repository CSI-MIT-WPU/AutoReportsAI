import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const getUserRepos = async (userId: string) => {
  let repos = [];
  try {
    const response = await getDocs(
      collection(db, `users/${userId}/repositories`)
    );
    repos = response.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
  return repos;
};

export { getUserRepos };
