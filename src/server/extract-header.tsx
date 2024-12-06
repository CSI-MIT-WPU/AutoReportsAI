"use server";

import axios from "axios";
import { auth } from "@clerk/nextjs/server";

//Extracts headers from a file
const extractHeaders = async (file: File) => {
    const prompt = `
    You are an expert in text extraction and contextualization. Your task is to analyze the structure of a PDF document, identify headers or labels that appear in the document, and return them in a space-separated string format. Additionally, you need to contextualize each header based on its content or typical usage patterns. Here are the specific instructions:
    
    Header Extraction:
    - Identify all the distinct headers or labels in the PDF (e.g., Date, Outcomes, In Progress).
    - Ignore body text, paragraphs, or content under the headers; only focus on the labels/headers.
    
    Contextualization:
    - For each header, analyze its meaning and provide a standardized version if needed.
    - For example:
      - If the header is In Progress, standardize it as in-progress:.
      - If the header is Date, standardize it as date:.
      - If a header doesn't require contextualization, simply keep it lowercase and append a colon (:).
    
    Output Format:
    - Return all the headers as a single string, separated by spaces.
    - For example: date: outcomes: in-progress:
    
    Assumptions and Contextualization Rules:
    - Always append a colon (:) to the standardized version of the header.
    - If the header is ambiguous, attempt to infer its context from nearby words.
    `;

    const formData = new FormData();
    formData.append("training_data", prompt);
    formData.append("question", "Here is the pdf file.");
    formData.append("model", "aicon-v4-nano-160824");
    formData.append("stream_data", "false");
    formData.append("response_type", "json");

    const filesArray = [file];
    filesArray.forEach((file) => {
        formData.append("files", file);
    });

    const options = {
        method: "POST",
        url: "https://api.worqhat.com/api/ai/content/v4",
        headers: {
            Authorization: `Bearer ${process.env.WORQHAT_API_KEY as string}`,
        },
        data: formData,
    };

    try {
        const user = auth();
        const userId = user?.userId;
        if (!userId) {
            throw new Error("User not found");
        }

        const response = await axios(options);
        const headers = JSON.parse(response.data.content).headers;
        if (!headers) {
            throw new Error("Headers not found");
        }
        console.log(headers);
        return headers;
    } catch (error: any) {
        console.error(`Error extracting headers: ${error.message}`);
        return "Unable to extract headers.";
    }
};

export { extractHeaders };
