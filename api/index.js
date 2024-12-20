import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

const app = express();
dotenv.config();


mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("database connected");
})
.catch((err) => {
    console.log(err);
})

app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send("GET Request Called")
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