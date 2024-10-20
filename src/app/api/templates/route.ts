import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

//POST request to create a new template doc on firebase
export async function POST(request: Request) {
    try {
        const userId = auth().userId;
        if (!userId) {
            return new Response("User ID is required", { status: 400 });
        }
        // 1. Retrieve Access Token from Firestore
        const userDoc = await getDoc(doc(db, `users/${userId}`));
        if (!userDoc.exists()) {
            return new Response("User not found", { status: 404 });
        }

        // 2. Get form data
        const formData = await request.formData();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const file = formData.get("file") as File;

        if (!title || !description || !file) {
            return new Response("Title, description and file are required", { status: 400 });
        }

        // 3. Add file to firestore storage
        const storage = getStorage();
        const storageRef = ref(storage, `templates/${userId}/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(snapshot.ref);

        // 4. Create a new template doc
        await setDoc(doc(db, `users/${userId}/templates/${Date.now()}`), {
            title: title,
            description: description,
            fileUrl: fileUrl,
            createdAt: new Date().toISOString(),
        });

        return new Response("Template created successfully", { status: 200 });
    } catch (error) {
        console.error("Error creating a new template", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}