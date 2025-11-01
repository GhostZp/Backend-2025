const users = [
  {
    user_id: 260,
    username: 'VCHar',
    password: '********',
    email: 'vchar@example.com',
    user_level_id: 1,
    created_at: '2020-09-12T06:56:41.000Z',
  },
  {
    user_id: 305,
    username: 'Donatello',
    password: '********',
    email: 'dona@example.com',
    user_level_id: 1,
    created_at: '2021-12-11T06:00:41.000Z',
  },
  {
    user_id: 3609,
    username: 'Anon5468',
    password: '********',
    email: 'x58df@example.com',
    user_level_id: 3,
    created_at: '2023-04-02T05:56:41.000Z',
  },
];

const getUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const userFound = users.find(
    (user) => user.user_id === parseInt (req.params.id),
  );
  if (userFound) {
    res.json(userFound);
  } else {
    res.status(404).json({error: 'not found'});
  }
};

const postUser = (req, res) => {
  const { user_id, username, password, email, user_level_id, created_at } = req.body;
  const requiredFields = ['user_id', 'username', 'password', 'email', 'user_level_id', 'created_at'];
  const missingFields = requiredFields.filter(field => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Missing required fields",
      missing: missingFields
    });
  }
  const newUser = { user_id, username, password, email, user_level_id, created_at };
  users.push(newUser);
  return res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
};


const putUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(user => user.user_id === userId);
  if (index === -1) {
    return res.sendStatus(404);
  }
  const { username, email } = req.body;
  if (!username && !email) {
    return res.status(400).json({ error: "username or email required" });
  }
  if (username) users[index].username = username;
  if (email) users[index].email = email;
  return res.json({ updated_user: users[index] });
};


const deleteUserbyID = (req, res) => {
  const userToBeDeletedIndex = users.findIndex(
    (user) => user.user_id === parseInt(req.params.id),
  );
  if (userToBeDeletedIndex != -1) {
    users.splice(userToBeDeletedIndex, 1);
    res.status(200).json({message: 'user deleted'});
  } else {
    res.status(404).json({message: 'user not found'});
  }
};

export {getUsers, getUserById, postUser, putUser, deleteUserbyID};