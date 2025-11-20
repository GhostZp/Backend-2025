import express from 'express';
import {
  deleteMedia,
  getMedia,
  getMediaById,
  postMedia,
  putMedia,
} from '../controllers/media-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import upload from '../middlewares/upload.js';
import {body} from 'express-validator';
import {validationErrors} from '../middlewares/error-handler.js';

// All media endpoints handled with express router
const mediaRouter = express.Router();

mediaRouter
  .route('/')
  // only logged in user can fetch the media list
  .get(authenticateToken, getMedia)
  // post new media item
  .post(
    authenticateToken,
    upload.single('file'),
    body('title').isLength({min: 3, max: 100}),
    body('description')
      .optional()
      .isLength({max: 500})
      .withMessage('Description cannot exceed 500 characters'),
    body('media_type')
      .isIn(['image', 'video', 'audio'])
      .withMessage('media_type must be one of: image, video, audio'),
    body('filename')
      .optional()
      .matches(/^[\w.-]+$/)
      .withMessage('Filename contains invalid characters'),
    validationErrors,
    postMedia,
  );

mediaRouter
  .route('/:id')
  // get media by id
  .get(authenticateToken, getMediaById)
  // update an existing media item by id
  .put(authenticateToken, putMedia)
  // delete media
  .delete(authenticateToken, deleteMedia);

export default mediaRouter;
