import promisePool from '../utils/database.js';

// SELECT all likes
const selectAllLikes = async () => {
  const [rows] = await promisePool.query(
    'SELECT like_id, media_id, user_id, created_at FROM Likes'
  );
  console.log('selectAllLikes result', rows);
  return rows;
};

// SELECT like by ID
const selectLikeById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT like_id, media_id, user_id, created_at FROM Likes WHERE like_id = ?',
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

// INSERT new like
const insertLike = async (like) => {
  try {
    const { user_id, media_id } = like;

    const [result] = await promisePool.query(
      'INSERT INTO Likes (media_id, user_id) VALUES (?, ?)',
      [media_id, user_id]
    );

    console.log('insertLike', result);
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

// DELETE like by ID
const deleteLikeById = async (id) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM Likes WHERE like_id = ?',
      [id]
    );
    console.log('Rows affected:', result.affectedRows);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export {
  selectAllLikes,
  selectLikeById,
  insertLike,
  deleteLikeById
};
