import { db } from "@/lib/firebase";
import { clerkClient } from "@clerk/nextjs/server";
import { doc, updateDoc } from "firebase/firestore";

export async function POST(req: Request) {
  const { userId, provider } = await req.json();

  try {
    const tokenData = await clerkClient().users.getUserOauthAccessToken(
      userId,
      provider
    );

    const userDocName = process.env.NEXT_PUBLIC_DB_USERS_DOC as string;

    await updateDoc(doc(db, `${userDocName}/${userId}`), {
      accessToken: tokenData.data[0].token,
    });

    return new Response(JSON.stringify({ tokenData: tokenData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching or saving token:", error);
    return new Response("Error fetching or saving token", { status: 500 });
  }
}
