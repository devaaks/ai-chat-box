import OpenAI from "openai";
let openai: OpenAI | null = null;

export const useOpenAI = () => {

    const initializeOpenAI = async () => {
      if (openai) {
          return openai;
      }
      const apiKey = import.meta.env.OPENAI_API_KEY;
      if (!apiKey) {
          throw new Error("OpenAI API key not found");
      }
      
      openai = new OpenAI({
        baseURL: import.meta.env.OPENAI_API_URL,
        apiKey,
      });
    };

    const getCompletion = async (prompt: string) => {
      if (!openai) {
        throw new Error("OpenAI is not initialized");
      }
      
      const completion = await openai.chat.completions.create({
        model: 'openai/gpt-4o',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      console.log({ completion });

      return completion.choices[0].message;
    };

    return {
      initializeOpenAI,
      getCompletion,
    };
};
