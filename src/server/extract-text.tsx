"use server"

import { auth } from "@clerk/nextjs/server";

// Extracts text from a pdf 
const extractText = async (file: File) => {
    try {
        const user  = auth();
        const userId = user?.userId;
        if(!userId){
            throw new Error("User not found");       
        }
        const url = "https://api.worqhat.com/api/ai/v2/pdf-extract";
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.WORQHAT_API_KEY as string}`,
            },
            body: formData
        });
        const textResponse = await response.text();
        return textResponse;
    } catch (error:any) {
        console.log(`Error extracting text from PDF: ${error.message}`);
        return "Unable to extract text from PDF file."
    }
};

export { extractText }