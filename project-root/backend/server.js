import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/chat', chatRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
