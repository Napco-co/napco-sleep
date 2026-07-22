import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export async function askNappi(message) {

  try {

    const result = await model.generateContent(`
Kamu adalah NAPPI AI.

Kamu adalah AI yang membantu pengguna meningkatkan kualitas tidur.

Jawab dalam Bahasa Indonesia.

Jawaban maksimal 200 kata.

Pertanyaan pengguna:

${message}
`);

    return result.response.text();

  } catch (err) {

    console.error("Gemini Error:", err);

    return "Maaf, AI sedang mengalami gangguan.";

  }

}