import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.log("WEBHOOK_SECRET not set");
    return new Response(
      "You need to set the WEBHOOK_SECRET environment variable",
      {
        status: 400,
      }
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.log("No svix headers");
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  //   console.log("Error verifying webhook:", typeof req);
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  if (!id) return new Response("User ID not found", { status: 400 });
  const userDocName = process.env.NEXT_PUBLIC_DB_USERS_DOC as string;
  if (eventType === "user.created") {
    const { first_name, last_name, email_addresses, id } = evt.data;
    try {
      // add user to db
      await setDoc(doc(db, userDocName, id), evt.data);
      console.log("User created successfully");
    } catch (error) {
      console.error("Error inserting user:", error);
      return Response.json({ error: "Error inserting user" }, { status: 500 });
    }
  } else if (eventType === "user.updated") {
    const { first_name, last_name, email_addresses } = evt.data;
    try {
      // update user in db
      await setDoc(doc(db, userDocName, id), evt.data, { merge: true });
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      return Response.json({ error: "Error updating user" }, { status: 500 });
    }
  } else if (eventType === "user.deleted") {
    try {
      // delete user from db
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      return Response.json({ error: "Error deleting user" }, { status: 500 });
    }
  }
  return new Response("Webhook handled successfully", { status: 200 });
}
