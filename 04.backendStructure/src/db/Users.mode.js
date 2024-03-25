import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bcrypt from "bcrypt"
const usersSchema = new mongoose.schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullname: {
      type:String,
      required: true,
      trim: true,
      index: true,

    },
    avatar: {
      type: String, //cloudanary url bro
      required: true,
    },
    coverimage: {
      type: String, //cloudanary url bro
    },
    watchhistory: [{ type: Schema.Types.ObjectId, ref: "VIDEO" }],
    password: {
      type: String,
      required: [true, "pasword is required bro "],
    },
    refreshtoken: {
      type: String,
    },
  },
  { timestamps: true }
);
usersSchema.pre("save", async function (next) {
    if(this.isModified("password")) {

        next();
        this.password = bcrypt.hash(this.password, 10);

    }
    else{
        next();
    }
});
//export const USERS = mongoose.model("USERS", usersSchema);
export const USERS=mongoose.model("USERS",usersSchema)
