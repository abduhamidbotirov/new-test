import { Request, Response } from 'express';
import { User } from './user.model.js';
import handleError from '../../utils/catchError.js';
import { Post } from '../Post/post.model.js';

interface IUser {
    username: string;
    email: string;
    phone: string;
}
class UserController {
    public static async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, phone }: IUser = req.body;
            const user = await User.create({ username, email, phone });
            res.status(201).json(user);
        } catch (error: any) {
            handleError(res, error);
        }
    }
    public static async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.findAll({
                include: [Post],
            });
            res.status(200).json(users);
        } catch (error: any) {
            handleError(res, error);
        }
    }
    public static async getUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const user = await User.findByPk(userId, {
                include: [Post],
            });
            if (!user) {
                res.status(404).json({ message: 'Istifadəçi tapılmadı' });
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            handleError(res, error);
        }
    }
    public static async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const { username, email, phone }: IUser = req.body;
            const user = await User.findByPk(userId);
            if (!user) {
                res.status(404).json({ message: 'Istifadəçi tapılmadı' });
                return;
            }
            Object.assign(user, {
                username, email, phone
            }); // Yeniləmək üçün obyektin xüsusiyyətlərini əvəz edirik

            await user.save();
            res.status(200).json(user);
        } catch (error: any) {
            handleError(res, error);
        }
    }
    public static async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const user = await User.findByPk(userId);
            if (!user) {
                res.status(404).json({ message: 'Istifadəçi tapılmadı' });
                return;
            }
            await user.destroy();
            res.status(204).send();
        } catch (error: any) {
            handleError(res, error);
        }
    }
}

export default UserController;
