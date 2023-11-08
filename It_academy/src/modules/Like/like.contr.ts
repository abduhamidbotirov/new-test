import {
  JsonController,
  Get,
  Post,
  Body,
  HttpCode,
  UseBefore,
  Req,
} from 'routing-controllers';
import {Request} from "express";
import Like from "./like.schema";
import {ErrorHandlerMiddleware} from "../../middleware/errorHandlerDecoratir";
import {JWT} from "../../utils/jwt";

@JsonController("/like")
@UseBefore(ErrorHandlerMiddleware)
export class LikeController {
  @Get("/")
  async getAllLikes() {
    const likes = await Like.find();
    return {length: likes.length, likes};
  }

  @Post("/")
  @HttpCode(201)
  async handleLike(@Body() reqBody: any, @Req() req: Request): Promise<any> {
    try {
      // status = "like", "dislike", "delete"
      const {itemId, status, likeId}: {
        itemId: string,
        likeId: string,
        status: "like" | "dislike" | "delete"
      } = reqBody;

      const token = req.headers.token as string;
      const userId = JWT.VERIFY(token).id;

      // Like DBda bo'lsa o'zgartiradi
      if (likeId) {
        const like = await Like.findById(likeId);
        if (!like || !like.userId.equals(userId)) throw new Error("Like was not found");
        if (status === "delete") {
          await Like.findByIdAndDelete(likeId);
          return "Successfully deleted"
        } else if (status === "like") {
          like.like = true;
          await like.save();
          return like;
        } else {
          like.like = false;
          await like.save();
          return like;
        }
      }
      // Like BDda bo'lmasa yaratadi
      else {
        return await Like.create({
          userId: userId,
          item: itemId,
          like: status === "like",
        });
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
