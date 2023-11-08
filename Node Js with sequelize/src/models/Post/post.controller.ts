import { Request, Response } from 'express';
import { Post } from './post.model.js';
import handleError from '../../utils/catchError.js';
interface IPost {
    title: string;
    description: string;
    img: string;
    userId: number;
    [key: string]: any; // Indeks siqnatürü
}
class PostController {
    public static async createPost(req: Request, res: Response): Promise<void> {
        try {
            const { title, description, img, userId }: IPost = req.body;
            const post = await Post.create({ title, description, img, userId });
            res.status(201).json(post);
        } catch (error: any) {
            handleError(res, error);
        }
    }
    public static async getPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = await Post.findAll();
            res.status(200).json(posts);
        } catch (error: any) {
            handleError(res, error);
        }
    }
    public static async getPost(req: Request, res: Response): Promise<void> {
        try {
            const postId = Number(req.params.id);
            const post = await Post.findByPk(postId);
            if (!post) {
                res.status(404).json({ message: 'Post tapılmadı' });
                return;
            }
            res.status(200).json(post);
        } catch (error: any) {
            handleError(res, error);
        }
    }
    public static async updatePost(req: Request, res: Response): Promise<void> {
        try {
            const postId = Number(req.params.id);
            const postData: IPost = req.body;
            const post = await Post.findByPk(postId);
            if (!post) {
                res.status(404).json({ message: 'Post tapılmadı' });
                return;
            }
            Object.assign(post, postData); // Yeniləmək üçün obyektin xüsusiyyətlərini əvəz edirik
            await post.save();
            res.status(200).json(post);
        } catch (error: any) {
            handleError(res, error);
        }
    }
    public static async deletePost(req: Request, res: Response): Promise<void> {
        try {
            const postId = Number(req.params.id);
            const post = await Post.findByPk(postId);
            if (!post) {
                res.status(404).json({ message: 'Post tapılmadı' });
                return;
            }
            await post.destroy();
            res.status(204).send();
        } catch (error: any) {
            handleError(res, error);
        }
    }
}
export default PostController;
