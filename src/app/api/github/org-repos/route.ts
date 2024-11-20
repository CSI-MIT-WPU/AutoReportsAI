import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "@clerk/nextjs/server";
import { ratelimit } from "@/lib/ratelimit";

export async function POST(req: Request) {
  try {
    // Assuming you have a way to get the userId from the request (e.g., Clerk session)
    const userId = auth().userId;

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const { success } = await ratelimit.limit("get-org-repos-" + userId);
    if (!success) throw new Error("Rate limit exceeded");

    // 1. Retrieve Access Token from Firestore
    const userDocName = process.env.NEXT_PUBLIC_DB_USERS_DOC as string;
    const userDoc = await getDoc(doc(db, `${userDocName}/${userId}`));
    if (!userDoc.exists()) {
      return new Response("User not found", { status: 404 });
    }
    const accessToken = userDoc.data().accessToken;

    // 2. Fetch Repositories from GitHub API
    const response = await fetch("https://api.github.com/orgs/WorqHat/repos", {
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
