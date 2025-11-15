import express from 'express';
import {
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUsers,
} from '../controllers/user-controller.js';
const userRouter = express.Router();

// all routes to /api/users
userRouter.route('/')
  .get(getUsers)
  .post(addUser);

// all routes to /api/users/:id
userRouter.route('/:id')
  .get(getUserById)
  .put(editUser)
  .delete(deleteUser);

export default userRouter;