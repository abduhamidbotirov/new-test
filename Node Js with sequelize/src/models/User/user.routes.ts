// user.routes.ts
import { Router } from 'express';
import userContr from './user.controller.js';

const router = Router();

router.post('/create', userContr.createUser);
router.get('/get', userContr.getUsers);
router.get('/get/:id', userContr.getUser);
router.put('/update/:id', userContr.updateUser);
router.delete('/delete/:id', userContr.deleteUser);

export default router;
