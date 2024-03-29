import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";


// routes
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import bookingRoutes from "./routes/my-bookings";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGO_URL as string);
  

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
}));

app.use(express.static(path.join(__dirname,"../../frontend/dist")));

// user routes
app.use("/api/users",userRoutes);

// auth routes
app.use("/api/auth",authRoutes);

// hotel routes
app.use("/api/my-hotels",myHotelRoutes);

// search routes
app.use("/api/hotels",hotelRoutes);

// bookings routes
app.use("/api/my-bookings",bookingRoutes);


app.get("*",(req:Request,res:Response) => {
  res.sendFile(path.join(__dirname,'../../frontend/dist/index.html'))
})

app.listen(7000,()=>{
    console.log("Server is running on localhost:7000")
})