import groqLLM from '../llm/groq.js';

export const handleChat = async (req, res) => {
  const { message } = req.body;
  try {
    const reply = await groqLLM(message);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'LLM error' });
  }
};
