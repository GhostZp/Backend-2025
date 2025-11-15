import express from 'express';
import {
    getLikes,
    addLikes,
    getLikesById,
    deleteLike
} from '../controllers/likes-controller.js';
const likesRouter = express.Router();

// all routes to /api/likes
likesRouter.route('/')
  .get(getLikes)
  .post(addLikes);

// all routes to /api/likes/:id
likesRouter.route('/:id')
  .get(getLikesById)
  .delete(deleteLike);

export default likesRouter;