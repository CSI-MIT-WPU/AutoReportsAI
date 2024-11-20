"use server";
import { app } from "@/lib/firebase";
import { ref, getDownloadURL, getStorage } from "firebase/storage";

const getAsset = async(filePath: string) => {
    try {
        const storage = getStorage(app);
        const fileRef = ref(storage, filePath);
        const url = await getDownloadURL(fileRef);
        return url;
    } catch (error) {
        console.error("Error retrieving asset", error);
        return null;
    }
};

export default getAsset;