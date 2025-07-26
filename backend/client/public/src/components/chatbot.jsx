import { useState } from 'react';

export default function Chatbot() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const askChatbot = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('http://localhost:3000/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setResponse(data.answer || data.error);
    } catch (err) {
      setResponse('❌ Failed to connect to chatbot.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">🧠 Ecommerce Chatbot</h2>

      <textarea
        className="w-full p-3 border rounded-lg mb-4"
        rows="3"
        placeholder="Ask a question like 'What are the most returned products?'"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={askChatbot}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Asking...' : 'Ask'}
      </button>

      {response && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold">Response:</h3>
          <pre className="whitespace-pre-wrap mt-2 text-sm text-gray-800">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
