import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import expenseRoutes from './routes/expense.routes.js';
import incomeRoutes from './routes/income.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import insightRoutes from './routes/insights.routes.js';
import profileRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({origin: process.env.CLIENT_URL, credential: true}))

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/user', profileRoutes);


app.use((req, res)=> res.status(404).json({message: "route not found"}));

const PORT = process.env.PORT || 3000;
app.get('/', (req, res)=>{
    res.send("hello world")
})
connectDB().then(()=>{
    app.listen(PORT, ()=> console.log(`server is running on http://localhost:${PORT}`))
})
