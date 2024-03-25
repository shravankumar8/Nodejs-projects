import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new mongoose.schema(
  {
    videofile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "USERS", //cloudanary url bro
      required: true,
    },
    title: {
      type: String, //cloudanary url bro
      required: true,
    },
    description: {
      type: String, //cloudanary url bro
      required: true,
    },
    duration: {
      type: Number,
      required: [true, "pasword is required bro "],
    },
    views: {
      type: Number,
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const VIDEO = mongoose.model("VIDEO", videoSchema);
