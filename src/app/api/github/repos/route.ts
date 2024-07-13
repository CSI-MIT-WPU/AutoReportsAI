import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    // Assuming you have a way to get the userId from the request (e.g., Clerk session)
    const userId = auth().userId;

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    // 1. Retrieve Access Token from Firestore
    const userDoc = await getDoc(doc(db, `users/${userId}`));
    if (!userDoc.exists()) {
      return new Response("User not found", { status: 404 });
    }
    const accessToken = userDoc.data().accessToken;

    // 2. Fetch Repositories from GitHub API
    const response = await fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(`GitHub API Error: ${errorText}`, {
        status: response.status,
      });
    }

    const repos = await response.json();
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
