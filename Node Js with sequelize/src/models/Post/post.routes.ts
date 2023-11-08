// post.routes.ts
import { Router } from 'express';
import postContr from './post.controller.js';

const router = Router();

router.post('/create', postContr.createPost);
router.get('/get', postContr.getPosts);
router.get('/get/:id', postContr.getPost);
router.put('/update/:id', postContr.updatePost);
router.delete('/delete/:id', postContr.updatePost);

export default router;
