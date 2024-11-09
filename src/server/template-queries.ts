import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const getUserTemplates = async (userId: string) => {
    let templates = [];
    try {
        const response = await getDocs(collection(db, `users/${userId}/templates`));
        templates = response.docs.map((template) => {
            return {
                id: template.id.toString(),
                title: template.data().title,
                headings: template.data().headings,
                description: template.data().description
            }
        });
    } catch (error) {
        console.error("Error fetching reports:", error);
        return [];
    }
    return templates;
}

export { getUserTemplates };