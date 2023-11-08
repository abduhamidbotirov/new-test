import mongoose, {Document, Types} from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  user: mongoose.Types.ObjectId;
}

export interface ICategory extends Document {
  catName: string;
  videosId?: Types.ObjectId[] | Array<Types.ObjectId>;
}

export interface ILike extends Document {
  userId: Types.ObjectId;
  item: Types.ObjectId;
  like: boolean;
}

export interface IComment {
  body: string;
  user_id: Types.ObjectId;
  video_id: Types.ObjectId;
}