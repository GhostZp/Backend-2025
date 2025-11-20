import express from 'express';
import {
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUsers,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import { body } from 'express-validator';
import { validationErrors } from '../middlewares/error-handler.js';


const userRouter = express.Router();

// all routes to /api/users
userRouter.route('/')
  // only logged in user can fetch the user list
  .get(authenticateToken, getUsers)
  .post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 100}).isAlphanumeric(),
    body('password').trim().isLength({min: 8, max: 100}), 
    validationErrors,
    addUser
    );

// all routes to /api/users/:id
userRouter.route('/:id')
  .get(authenticateToken, getUserById)
  .put(authenticateToken, editUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;