import express from 'express';
import cors from 'cors';
import { connectToDB } from './database/mongoose.js';
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { createPermission } from './config/init/index.js';
import dashboardRouter from './routes/dashboard/dashboard.js'

const app = express();
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use(express.json());
app.use(cors());
connectToDB();
createPermission();

app.set('view engine', 'ejs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + '/public'));

app.use("/dashboard", dashboardRouter)
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/products', productRouter);

//Handles Not Found Routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(3003, '0.0.0.0', () => {
  console.log('Server running on port 5001');
});
