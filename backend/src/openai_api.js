import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function completion(chats) {
  const response = await openai.chat.completions.create({
    messages: chats,
    model: "gpt-3.5-turbo",
  });
  let chatGptResponse = {
    role: response.choices[0].message.role,
    content: response.choices[0].message.content,
  };
  return chatGptResponse;
}
