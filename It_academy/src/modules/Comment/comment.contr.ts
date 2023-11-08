import {
  JsonController,
  Post,
  Put,
  Delete,
  Body,
  UseBefore,
  Req,
} from 'routing-controllers';
import Comment from "./comment.schema";
import {ErrorHandlerMiddleware} from "../../middleware/errorHandlerDecoratir";
import {Request} from "express";
import {JWT} from "../../utils/jwt";
import authMiddleware from "../../middleware/auth";

@JsonController("/comment")
@UseBefore(ErrorHandlerMiddleware)
export class CommentController {
  @Post("/")
  @UseBefore(authMiddleware)
  async createComment(@Body() reqBody: any, @Req() req: Request) {
    try {
      const {comment, videoId} = reqBody;

      const token = req.headers.token as string;
      const userId = JWT.VERIFY(token).id;

      return Comment.create({
        body: comment,
        videoId,
        userId,
      })
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  @Put("/")
  @UseBefore(authMiddleware)
  async editComment(@Body() reqBody: any, @Req() req: Request) {
    try {
      const {comment, commentId}: { comment: string, commentId: string } = reqBody;

      const token = req.headers.token as string;
      const userId = JWT.VERIFY(token).id;

      const commentDB = await Comment.findById(commentId);
      if (commentDB && commentDB.user_id.equals(userId)) {
        Comment.findByIdAndUpdate(commentId, {body: comment})
          .then(comment => comment)
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  @Delete("/")
  @UseBefore(authMiddleware)
  async deleteComment(@Body() reqBody: any, @Req() req: Request) {
    try {
      const {commentId}: { commentId: string } = reqBody;

      const token = req.headers.token as string;
      const userId = JWT.VERIFY(token).id;

      const comment = await Comment.findById(commentId);

      if (comment && comment.user_id.equals(userId)) {
        return Comment.findByIdAndRemove(commentId);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}