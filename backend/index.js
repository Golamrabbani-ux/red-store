import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import path from 'path';
import connectDB from '../backend/config/db.js'
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


// All route declear
app.get('/', (req, res) => {
    res.send('Api is running....');
})
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/api', uploadRoutes);


// Custom Error Handler
app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Example app listening on ${process.env.NODE_ENV} at http://localhost:${port}`.yellow.bold)
})