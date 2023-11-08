import mongoose from "mongoose";
import {ILike} from "../../interface/interface";

const {ObjectId} = mongoose.Schema.Types

const likeSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  item: {
    type: ObjectId,
    required: true,
  },
  like: {
    type: Boolean,
    required: true,
  }
}, {timestamps: true});

likeSchema.set("toObject", {
  transform: (doc, ret) => {
    ret._id = ret._id.toString()
  }
})

export default mongoose.model<ILike>("Like", likeSchema);