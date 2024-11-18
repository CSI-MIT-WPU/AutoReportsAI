"use server";

import axios from "axios";
import { ratelimit } from "@/lib/ratelimit";
import { auth } from "@clerk/nextjs/server";

const generateReport = async (commits: any[], from: string, to: string, headings: string) => {
  const prompt = `You are an AI report writer. You will be given a list of commits and you will need to write a report on the commits. These commits are from a Github repository and between the dates ${from} and ${to}. The report should be in markdown format. The report should be at least 100 words long. The report should be written in a professional tone. Do not include any other information in the report. Do not include any emojis. Do not include any hashtags. Do not include any links. Do not include any images. Do not include any code. Do not include any quotes. Do not include any emojis. Do not include any hashtags. Do not include any links. Do not include any images. Do not include any code. Do not include any quotes. The report should be follow the following format:
  ${headings}
  
  Commits: ${commits
    .map((commit: any) => `- ${commit.date} -> ${commit.message}`)
    .join("\n")}`;

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
    if (!userId) throw new Error("User not found");

    const { success } = await ratelimit.limit("generate-report-" + userId);
    if (!success) throw new Error("Rate limit exceeded");

    const response = await axios(options);
    const feedback = response.data.content.trim();
    console.log("Feedback:", feedback);

    return feedback;
  } catch (err: any) {
    console.error(`Error generating feedback: ${err.message}`);
    return "Unable to generate feedback.";
  }
};

export { generateReport };
