"use server"

import axios from "axios";
import { auth } from "@clerk/nextjs/server";

//Extracts headers from a long string of text.
const extractHeaders = async (text: string) => {
    const prompt = `Extract all headings from the provided text and return them to me in a space separated format.
                    Make sure not to add any additional text to your response. Headings are labels that organize 
                    content (e.g., "Title," "Date," etc.). They may include colons (":"). List all headings,
                    ignoring the content under them. Include repeated headings and 
                    contextually implied ones like "Dt." for "Date." Avoid extracting
                    URLs, contact details, or metadata unless clearly labeled as a heading.
                    This is the text: ${text}`;
    const options = {
        method: "POST",
        url: "https://api.worqhat.com/api/ai/content/v2",
        headers: {
            Authorization: `Bearer ${process.env.WORQHAT_API_KEY as string}`,
            "Content-Type": "application/json",
        },
        data: {
            question: prompt,
            randomness: 0.1,
        },
    };
    try {
        const user = auth();
        const userId = user?.userId;
        if (!userId) {
            throw new Error("User not found");
        }
        const response = await axios(options);
        const headers = response.data.content.trim();
        return headers;
    } catch (error: any) {
        console.error(`Error extracting headers: ${error.message}`);
        return "Unable to extract headers.";
    }
}

export { extractHeaders };