import mongoose from "mongoose";
import { DbName } from "../constants.js";
import dotenv from "dotenv";
dotenv.config({});
let DBURL = process.env.DBURL;
const connectDB = async () => {
  try {
    console.log(DBURL+"/"+DbName)
    const connectionInstance = await mongoose.connect(`${DBURL}/${DbName}`);
    console.log(
      `%c \n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MONGODB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectDB