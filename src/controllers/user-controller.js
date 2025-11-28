import {
  selectAllUsers,
  selectUserById,
  updateUser,
  deleteUserById,
} from '../models/user-model.js';

// kaikkien käyttäjien haku
const getUsers = async (req, res, next) => {
  try {
    const users = await selectAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Userin haku id:n perusteella
const getUserById = async (req, res, next) => {
  try {
    const user = await selectUserById(req.params.id);

    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Userin muokkaus id:n perusteella
const editUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const {username, password, email} = req.body;

    if (!username || !password || !email) {
      const error = new Error(
        'Request must include username, password, and email.',
      );
      error.status = 400;
      return next(error);
    }

    const result = await updateUser(userId, {username, password, email});

    if (result.affectedRows === 0) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }

    res.json({message: 'User updated.'});
  } catch (err) {
    next(err);
  }
};

// Userin poisto id:n perusteella
const deleteUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);

    const result = await deleteUserById(userId);

    if (result.affectedRows === 0) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }

    res.json({message: 'User deleted.'});
  } catch (err) {
    next(err);
  }
};

export {getUsers, getUserById, editUser, deleteUser};
