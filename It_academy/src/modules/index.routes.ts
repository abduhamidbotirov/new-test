import express from "express";
import {LikeController} from "./Like/like.contr";

const router = express.Router();
const likeController = new LikeController();

router.use('/test', (req,res) => { res.send("ok")});

export default router