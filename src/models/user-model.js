import promisePool from '../utils/database.js';


const selectAllUsers = async () => {
  const [rows] = await promisePool.query(
    'SELECT user_id, username, password, email, user_level_id, created_at FROM Users',
  );
  console.log('selectAllUsers result', rows);
  return rows;
};

const selectUserById = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, password, email, user_level_id, created_at FROM Users WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    // return only first item of the result array
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const insertUser = async (user) => {
  const {username, password, email, user_level_id} = user;
  const sql = `INSERT INTO Users (username, password, email, user_level_id)
               VALUES (?, ?, ?, ?)`;
  const params = [username, password, email, user_level_id];
  try {
    const [result] = await promisePool.execute(sql, params);
    //console.log('rows', rows);
    return {user_id: result.insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
    // optionally
    //throw new Error('user creation failed');
  }
};

const updateUser = async (id, data) => {
  const { username, password, email } = data;

  try {
    const [result] = await promisePool.query(
      'UPDATE users SET username = ?, password = ?, email = ? WHERE user_id = ?',
      [username, password, email, id]
    );

    console.log("Rows affected:", result.affectedRows);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Database error');
  }
};

const deleteUserById = async (id) => {
  try {
    const [result] = await promisePool.query (
      'DELETE FROM users WHERE user_id = ?',
      [id]
    );

    console.log("Rows affected:", result.affectedRows);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Database error');
  }
};

// For the login

const selectUserByUsername = async (username) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, password, email, user_level_id, created_at FROM Users WHERE username=?',
      [username],
    );
    console.log(rows);
    // return only first item of the result array
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const selectUserByNameAndPassword = async (username, password) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, user_level_id, created_at FROM Users WHERE username=? AND password=?',
      [username, password],
    );
    console.log(rows);
    // return only first item of the result array
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export {selectAllUsers, selectUserById, insertUser, updateUser, deleteUserById, selectUserByUsername, selectUserByNameAndPassword};