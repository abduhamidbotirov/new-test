import express from "express";
import userRoutes from './User/user.routes.js';
import postRoutes from './Post/post.routes.js';
const router = express.Router();
router.use('/test', () => { });
router.use('/user', userRoutes);
router.use('/post', postRoutes);
export default router