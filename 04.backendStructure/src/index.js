import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import cors from 'cors'
const app = express();
dotenv.config({});
connectDB()
.then(() => {
  app.use(cors({
    origin:process.env.CORSORIGIN,
    credentials:true
  }))
  app.use(express.json({limit:"16kb"} ))//usually by default you can read the json inputs instead youd use body parser to parse and 
  //read but now express provides with inbuilt module to parse the body
//limit is used to limit the byes of input data 
  
  })
  .catch((err) => {
    console.error("db connect failed ", err);
  });
