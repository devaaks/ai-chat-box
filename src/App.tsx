import { useOpenAI } from './hooks/use-open-ai'
import './App.css'
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

type Message = { sender: 'ai' | 'user'; text: any; };

function App() {
  const openAI = useOpenAI();
  openAI.initializeOpenAI();

  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (prompt.trim() === '') return;

    const completion = await openAI.getCompletion(prompt);
    console.log({  AI_RESPONSE: completion });

    // show response in chat history and clear prompt
    // setChatHistory(chatHistory );
    const userMessage = { sender: 'user', text: prompt } as Message;
    setChatHistory([userMessage, { sender: 'ai', text: completion }, ...chatHistory]);
    setPrompt('');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="text-white p-4">
        <h1 className="text-xl font-semibold">LLM Chat Application</h1>
      </header>

      {/* Chat Container */}
      <main className="flex p-4 overflow-y-auto">
        <div className="space-y-4">
          {chatHistory.map((msg: Message, index: number) => (
            <div
              key={index}
              className={`p-2 rounded-md max-w-xs ${
                msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'
              }`}
            >
              {msg.sender === 'ai' ? (
                <ReactMarkdown>
                  {(msg.text)}
                </ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Input Section */}
      <footer className="bg-gray-100 p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <label htmlFor="prompt" className="sr-only">
            Prompt
          </label>
          <input
            type="text"
            id="prompt"
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App
