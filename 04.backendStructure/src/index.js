import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({
  path: "../.env.sample",
});
connectDB();
// import mongoose from 'mongoose';
// import {DbName }from './constants';
// (async()=>{
// try{
// await mongoose.connect(`${process.env.DBURL}/${DbName}`)
// }catch(error){
// console.log(error)

// }
// })()
// ~
// ~
// ~
