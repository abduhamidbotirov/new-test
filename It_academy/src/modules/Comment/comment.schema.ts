import mongoose, {Document, Schema} from "mongoose";
import {IComment} from "../../interface/interface";

const {ObjectId} = mongoose.Types;

const commentSchema = new Schema({
  body: {type: String, required: true},
  userId: {type: ObjectId, required: true},
  videoId: {type: ObjectId, required: true}
})

commentSchema.set("toObject", {
  transform: function (doc: Document, ret: any) {
    ret._id = ret._id.toString();
  }
})

export default mongoose.model<IComment>("Comment", commentSchema);