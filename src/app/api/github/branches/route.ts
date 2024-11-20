import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "@clerk/nextjs/server";
import { ratelimit } from "@/lib/ratelimit";

//POST request to get branches of a reporitory
export async function POST(req: Request){
    try {
        const userId = auth().userId;
        console.log(userId);
        if(!userId){
            return new Response("User ID is required", {status: 400});
        }

        // const {success} = await ratelimit.limit("get-branches-" + userId);
        // if(!success) throw new Error("Rate limit exceeded");
        const userDocName = process.env.NEXT_PUBLIC_DB_USERS_DOC as string
        const userDoc = await getDoc(doc(db, `${userDocName}/${userId}`));
        if(!userDoc.exists()){
            return new Response("User not found", {status: 404});
        }

        const accessToken = userDoc.data().accessToken;
        const { repoName } = await req.json();
        const response = await fetch(`https://api.github.com/repos/${repoName}/branches`, {
            headers: {
                Authorization: `token ${accessToken}`,
                Accept: "application/vnd.github+json"
            }
        });

        if(!response.ok){
            const errorText = await response.text();
            return new Response(`GitHub API Error: ${errorText}`, {
                status: response.status
            });
        }

        const branches = await response.json();
        console.log(branches);
        return new Response(JSON.stringify(branches), {
            status: 200,
            headers:{
                "Content-Type": "application/json"
            }
        });

    } catch (error) {
        console.error("Error fetching branches:", error);
        return new Response("Error fetching branches", {status: 500});
    }
}
