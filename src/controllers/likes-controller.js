import {
  selectAllLikes,
  selectLikeById,
  insertLike,
  deleteLikeById
} from '../models/likes-model.js';

// GET /api/likes
const getLikes = async (req, res) => {
  try {
    const likes = await selectAllLikes();
    res.json(likes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/likes
const addLikes = async (req, res) => {
  try {
    const newLikeId = await insertLike(req.body);
    res.status(201).json({ like_id: newLikeId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/likes/:id
const getLikesById = async (req, res) => {
  try {
    const like = await selectLikeById(req.params.id);

    if (!like) {
      return res.status(404).json({ message: 'Like not found' });
    }

    res.json(like);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/likes/:id
const deleteLike = async (req, res) => {
  try {
    const result = await deleteLikeById(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Like not found' });
    }

    res.json({ message: 'Like deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {getLikes, addLikes, getLikesById, deleteLike};