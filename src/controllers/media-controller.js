import {validationResult} from 'express-validator';
import {
  addMedia,
  findMediaById,
  listAllMedia,
  updateMedia,
  deleteMediaById,
} from '../models/media-model.js';

const getMedia = async (req, res, next) => {
  try {
    const media = await listAllMedia();
    res.json(media);
  } catch (err) {
    next(err);
  }
};

const getMediaById = async (req, res, next) => {
  try {
    const media = await findMediaById(req.params.id);

    if (!media) {
      const error = new Error('Media item not found');
      error.status = 404;
      return next(error);
    }

    media.filepath = `${req.protocol}://${req.headers.host}/${process.env.UPLOADS_PATH}/${media.filename}`;
    res.json(media);
  } catch (err) {
    next(err);
  }
};

const postMedia = async (req, res, next) => {
  try {
    // multer file missing
    if (!req.file) {
      const error = new Error('Invalid or missing file');
      error.status = 400;
      return next(error);
    }

    // validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msgs = errors
        .array()
        .map((e) => `${e.path}: ${e.msg}`)
        .join(', ');
      const error = new Error(msgs);
      error.status = 400;
      return next(error);
    }

    const {title, description} = req.body;
    const {filename, mimetype, size} = req.file;
    const user_id = req.user.user_id;

    const newMedia = {title, description, user_id, filename, mimetype, size};
    const result = await addMedia(newMedia);

    if (result.error) {
      const error = new Error(result.error);
      error.status = 500;
      return next(error);
    }

    res.status(201).json({
      message: 'New media item added.',
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

const putMedia = async (req, res, next) => {
  try {
    const mediaId = parseInt(req.params.id);
    const existing = await findMediaById(mediaId);

    if (!existing) {
      const error = new Error('Media item not found');
      error.status = 404;
      return next(error);
    }

    const {title, description} = req.body;

    if (!title && !description) {
      const error = new Error('title or description required');
      error.status = 400;
      return next(error);
    }

    const updated = await updateMedia(mediaId, {title, description});
    res.json({updated_media: updated});
  } catch (err) {
    next(err);
  }
};

const deleteMedia = async (req, res, next) => {
  try {
    const mediaId = parseInt(req.params.id);
    const existing = await findMediaById(mediaId);

    if (!existing) {
      const error = new Error('media item not found');
      error.status = 404;
      return next(error);
    }

    await deleteMediaById(mediaId);
    res.json({message: 'item deleted'});
  } catch (err) {
    next(err);
  }
};

export {getMedia, getMediaById, postMedia, putMedia, deleteMedia};
