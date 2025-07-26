import { useState } from 'react';
import axios from 'axios';

function ChatBox() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    const res = await axios.post('/api/chat', { message });
    setResponse(res.data.reply);
  };

  return (
    <div>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSend}>Send</button>
      <p><strong>AI:</strong> {response}</p>
    </div>
  );
}

export default ChatBox;
