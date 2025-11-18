import express from 'express';
import multer from 'multer'; 
import {
  deleteMedia,
  getMedia,
  getMediaById,
  postMedia,
  putMedia
} from '../controllers/media-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

// All media endpoints handled with express router
const mediaRouter = express.Router();
const upload = multer({dest: process.env.UPLOADS_PATH});


mediaRouter
  .route('/')
  // only logged in user can fetch the media list
  .get(authenticateToken, getMedia)
  // post new media item
  .post(authenticateToken, upload.single('file'), postMedia);

mediaRouter
  .route('/:id')
  // get media by id
  .get(authenticateToken, getMediaById)
  // update an existing media item by id
  .put(authenticateToken, putMedia) 
  // delete media
  .delete(authenticateToken, deleteMedia);

export default mediaRouter;