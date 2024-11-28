import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { extractText } from "@/server/extract-text";
import { extractHeaders } from "@/server/extract-header";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

//POST request to create a new custom-template
export async function POST(request: Request) {
  let docRef;
  let storageRef;
  const uniqueId = crypto.randomUUID();
  let headings = `
        Title:
        Date:
        Summary:
        Completed:
        In progress:
        Outcomes:
        Commits:`;
  try {
    const userId = auth().userId;
    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }
    // 1. Retrieve Access Token from Firestore
    const userDocName = process.env.NEXT_PUBLIC_DB_USERS_DOC as string;
    const userDoc = await getDoc(doc(db, `${userDocName}/${userId}`));
    if (!userDoc.exists()) {
      return new Response("User not found", { status: 404 });
    }

    // 2. Get form data
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;
    const reqType = formData.get("type") as string;

    if (reqType == "manual") {
      //do some
    }
    else {
      try {
        
        if (!title || !description || !file) {
          return new Response("Title, description and file are required", {
            status: 400,
          });
        }

        if (file.type !== "application/pdf") {
          return new Response("Only PDF files are allowed", { status: 400 });
        }

        // 3. Add file to firestore storage
        const storage = getStorage();
        storageRef = ref(storage, `templates/${userId}/${uniqueId}-${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(snapshot.ref);

        // 4. Create a new template doc
        docRef = doc(db, `${userDocName}/${userId}/templates/${uniqueId}`);
        await setDoc(docRef, {
          title: title,
          description: description,
          fileUrl: fileUrl,
          createdAt: new Date().toISOString(),
        });

        // 5. Send API request to worqhat-API to extract text from the PDF file
        const extractedText = await extractText(file);
        if (extractedText === "Unable to extract text from PDF file.") {
          return new Response("Unable to extract text from PDF file.", {
            status: 500,
          });
        }

        // 6. Get headings from the extracted text
        headings = await extractHeaders(extractedText);
        if (headings === "Unable to extract headers.") {
          return new Response("Unable to extract headers.", { status: 500 });
        }

        // 7. Add list of headers to template doc
        headings = headings.replace(/:/g, " ");
        const headingArray = headings
          .split(" ")
          .filter((word) => word.trim() !== "");
        await setDoc(docRef, { headings: headingArray }, { merge: true });

        return new Response("Template created successfully", { status: 200 });

      } catch (error) {
        // In case of failure, clean storage by removing added file and associated template doc
        if (storageRef) {
          await deleteObject(storageRef).catch((deleteError) => {
            console.error("Failed to delete file from storage:", deleteError);
          });
        }
        if (docRef) {
          await deleteDoc(docRef).catch((deleteError) => {
            console.error("Failed to delete template doc:", deleteError);
          });
        }
      }
    }
  } catch (error) {
    console.error("Error creating a new template", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

//GET request to retrieve all custom-templates
export async function GET(request: Request) {
  try {
    const userId = auth().userId;
    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }
    const userDocName = process.env.NEXT_PUBLIC_DB_USERS_DOC as string;
    const userDoc = await getDoc(doc(db, `${userDocName}/${userId}`));
    if (!userDoc.exists()) {
      return new Response("User not found", { status: 404 });
    }
    const querySnapshot = await getDocs(
      collection(db, `${userDocName}/${userId}/templates`)
    );
    const templates = querySnapshot.docs.map((doc) => doc.data());
    return new Response(JSON.stringify(templates), { status: 200 });
  } catch (error) {
    console.error("Error retrieving templates", error);
    return new Response("An error occurred", { status: 500 });
  }
}
