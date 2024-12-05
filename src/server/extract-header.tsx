"use server"

import axios from "axios";
import { auth } from "@clerk/nextjs/server";

//Extracts headers from a file
const extractHeaders = async (file: File) => {

    const prompt = `You will be provided with a PDF file that contains a report or a report template. Your task is to: 
    1. Scan the PDF file for text. 
    2. Identify and extract only the headings from the document. 
    3. Return the extracted headings in a space-separated format. 
    Headings are labels used to organize content (e.g., "Title," "Date," "Introduction," etc.). 
    Ensure that only headings are returned, excluding any body text or additional content. Ensure that the headings are returned in the order they appear in the document. 
    Return the headings in a space separated format.`

    const formData = new FormData();
    formData.append("question", prompt);
    formData.append('model', 'aicon-v4-nano-160824');
    formData.append("files", file);
    formData.append('stream_data', 'false');
    formData.append('response_type', 'text');

    const options = {
        method: "POST",
        url: 'https://api.worqhat.com/api/ai/content/v4',
        headers: {
            "Authorization": `Bearer ${process.env.WORQHAT_API_KEY as string}`,
            "Content-Type": "application/json"
        },
        data: formData
    };

    try {
        const user = auth();
        const userId = user?.userId;
        if (!userId) {
            throw new Error("User not found");
        }
        const response = await axios(options);
        const headers = response.data.content.trim();
        console.log("server code exec. headers:  " + headers);
        console.log(file)
        return headers;
    } catch (error: any) {
        console.error(`Error extracting headers: ${error.message}`);
        return "Unable to extract headers.";
    }
}

export { extractHeaders };