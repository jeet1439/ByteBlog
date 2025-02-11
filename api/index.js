import express from 'express';
const app = express();
app.use(cookieParser()); 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRoute from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import recommendationRoutes from './routes/recomandation.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
const __dirname = path.resolve();

mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("database connected");
})
.catch((err) => {
    console.log(err); 
})
app.use(cors());
app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.listen(3000, ()=>{
    console.log("server listing at port 3000!");
})


app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});