import express from "express"; 
import mongoose from "mongoose"; 
import bodyParser from "body-parser"; 
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

const app = express();

const PORT=3000;
app.use(bodyParser.json());

dotenv.config();

const port=process.env.PORT || 5000;
const MONGOURL=process.env.MONGO_URL;


   

mongoose
.connect(MONGOURL)
.then(() => { 
console.log("Database connected successfully."); 

app.listen(PORT,()=>{
    console.log(`Server is running on port : ${PORT}`);
});
})
.catch((error) => console.log(error)); 