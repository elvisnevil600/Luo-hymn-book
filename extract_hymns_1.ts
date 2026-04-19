import { GoogleGenAI } from "@google/genai";
import fs from "fs";

async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  const pdfData = fs.readFileSync("attached_assets/Wende_Nyasaye_Molos_Manyien-1-1-1-compressed_1776098053524.pdf");
  
  const prompt = "Please find the Luo hymns numbered 101 to 150 in the provided PDF. Extract them and output them strictly as a JSON array of objects with the fields 'number' (integer), 'title' (string), and 'lyrics' (string). The lyrics should include stanzas and choruses properly formatted with newlines. Do not include any other text markers like markdown code blocks in your response.";

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        parts: [
          {
            inlineData: {
              data: pdfData.toString("base64"),
              mimeType: "application/pdf"
            }
          },
          {
            text: prompt
          }
        ]
      }
    ]
  });

  console.log(response.text);
}

run();
