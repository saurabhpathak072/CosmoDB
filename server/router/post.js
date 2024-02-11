import express from 'express';
import { createPost, deletePost, getPost, updatePost } from '../Controller/post.js';

const router = express.Router();

router.route('/post').get(getPost).post(createPost);
router.route('/post/:postId').delete(deletePost).patch(updatePost);

export default router;