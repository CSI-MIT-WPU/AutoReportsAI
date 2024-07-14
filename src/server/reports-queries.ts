import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const getUserReports = async (userId: string) => {
  let reports = [];
  try {
    const response = await getDocs(collection(db, `users/${userId}/reports`));
    reports = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
  return reports;
};

export { getUserReports };
