import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';

dotenv.config();
const app = express();

mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("database connected");
})
.catch((err) => {
    console.log(err);
})


app.use('/api/user', userRoute);

app.get('/', (req, res) => {
    res.send("GET Request Called")
})

app.listen(3000, ()=>{
    console.log("server listing at port 3000!");
})
