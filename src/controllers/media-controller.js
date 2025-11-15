import {addMedia, findMediaById, listAllMedia, updateMedia, deleteMediaById} from '../models/media-model.js';

const getMedia = async (req, res) => {
  res.json(await listAllMedia());
};

const getMediaById = async (req, res) => {
  const media = await findMediaById(req.params.id);
  if (media) {
    // add full filepath url to media object
    media.filepath = `${req.protocol}://${req.headers.host}/${process.env.UPLOADS_PATH}/${media.filename}`;
    res.json(media);
  } else {
    res.sendStatus(404);
  }
};

const postMedia = async (req, res) => {
  let {title, description, user_id} = req.body;
  // replace description with empty string if undefined
  description = description ? description : '';
  console.log('req file by multer', req.file);
  const {filename, size, mimetype} = req.file;
  if (filename && title && user_id) {
    const result = await addMedia({
      user_id,
      filename,
      size,
      mimetype,
      title,
      description,
    });
    res.status(201);
    res.json({message: 'New media item added.', ...result});
  } else {
    res.sendStatus(400);
  }
};

const putMedia = async (req, res) => {
  const mediaId = parseInt(req.params.id);

  const existing = await findMediaById(mediaId);
  if (!existing) return res.sendStatus(404);

  const { title, description } = req.body;
  if (!title && !description) {
    return res.status(400).json({ error: "title or description required" });
  }

  const updated = await updateMedia(mediaId, { title, description });

  return res.json({ updated_media: updated });
};


const deleteMedia = async (req, res) => {
  const mediaId = parseInt(req.params.id);
  const existing = await findMediaById(mediaId);

  if (!existing) {
    return res.status(404).json({ message: 'media item not found' });
  }

  await deleteMediaById(mediaId);

  return res.json({ message: 'item deleted' });
};

export {getMedia, getMediaById, postMedia, putMedia, deleteMedia};
