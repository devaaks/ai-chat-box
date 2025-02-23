import OpenAI from "openai";

let openai: OpenAI | null = null;
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENAI_API_URL;
const LLM_MODEL = "deepseek/deepseek-r1-distill-llama-70b:free";

export const useOpenAI = () => {
  if (!API_KEY) {
    throw new Error("OpenAI API key not found");
  }

  const initializeOpenAI = async () => {
    if (openai) return openai;

    openai = new OpenAI({
      dangerouslyAllowBrowser: true,
      baseURL: BASE_URL,
      apiKey: API_KEY,
    });
  };

  const getCompletion = async (prompt: string) => {
    if (!openai) throw new Error("OpenAI is not initialized");
    
    const completion = await openai.chat.completions.create({
      model: LLM_MODEL,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    console.log({ completion });

    return completion.choices[0].message.content;
  };

  return {
    initializeOpenAI,
    getCompletion,
  };
};
