import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import router from './routes/product.routes.js';
import cors from 'cors'
import path from 'path'

dotenv.config();

const app = express();
const corsoption = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization']
}

const __dirname = path.resolve();

app.use(cors(corsoption));
app.use(express.json());


app.use("/api/products", router)
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, '/Frontend/dist')))


  // render frontend 
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"))
  })
}

console.log('before db connection');
connectDB(); 
console.log('after db connection');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

