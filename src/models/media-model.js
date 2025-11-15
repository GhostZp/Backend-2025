import promisePool from '../utils/database.js';

const listAllMedia = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM MediaItems');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findMediaById = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM mediaItems WHERE media_id = ?',
      [id]
    );
    return rows.length ? rows[0] : null;
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const addMedia = async (media) => {
  const { user_id, filename, size, mimetype, title, description } = media;

  const sql = `
    INSERT INTO mediaItems (user_id, filename, filesize, media_type, title, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [user_id, filename, size, mimetype, title, description];

  try {
    const [result] = await promisePool.execute(sql, params);
    return { media_id: result.insertId };
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const updateMedia = async (id, data) => {
  const { title, description } = data;

  // Build dynamic query so we only update what is provided
  const fields = [];
  const params = [];

  if (title !== undefined) {
    fields.push('title = ?');
    params.push(title);
  }

  if (description !== undefined) {
    fields.push('description = ?');
    params.push(description);
  }

  // No update fields → return null
  if (fields.length === 0) return null;

  const sql = `
    UPDATE mediaItems
    SET ${fields.join(', ')}
    WHERE media_id = ?
  `;
  params.push(id);

  try {
    const [result] = await promisePool.execute(sql, params);

    if (result.affectedRows === 0) return null;

    return findMediaById(id);
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const deleteMediaById = async (id) => {
  try {
    const [result] = await promisePool.execute(
      'DELETE FROM mediaItems WHERE media_id = ?',
      [id]
    );
    return result.affectedRows > 0;
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

export {listAllMedia, findMediaById, addMedia, updateMedia, deleteMediaById};