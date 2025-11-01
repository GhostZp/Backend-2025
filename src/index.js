import express from 'express';
import {
  getAllMedia,
  getMediaByID,
  postNewMediaItem,
  putMediaItem,
  deleteMediaByID
} from './media.js';
import { 
  getUserById, 
  getUsers,
  postUser, 
  putUser,
  deleteUserbyID
} from './users.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

const items = [
  {id: 2, name: 'eka'},
  {id: 11, name: 'toka juttu'},
];

// Config for Pug template engine
app.set('views', './views');
app.set('view engine', 'pug');

// parse json from request bodies
app.use(express.json());

// Serve pug template (server root)
app.get('/', (req, res) => {
  const content = {
    title: 'My Pug page',
    text: 'tässä tallennetut itemit',
    items,
  };
  res.render('index', content);
});

// Serve static files ('public' folder -> http server root)
app.use('/', express.static('public'));

// Media endpoints
// GET all media items
app.get('/api/media', getAllMedia);
// GET media by ID
app.get('/api/media/:id', getMediaByID);
// POST new media item
app.post('/api/media', postNewMediaItem);
// PUT media by ID
app.put('/api/media/:id', putMediaItem);
// DELETE media ID
app.delete('/api/media/:id', deleteMediaByID);

// Users endpoints
// GET all users
app.get('/api/users', getUsers);
// GET user by ID
app.get('/api/users/:id', getUserById);
// POST new user
app.post('/api/users', postUser);
// PUT user by ID
app.put('/api/users/:id', putUser);
// DELETE user by ID
app.delete('/api/users/:id', deleteUserbyID);


// Endpoints for /items API
app.get('/api/items', (req, res) => {
  res.json(items);
});
app.get('/api/items/:id', (req, res) => {
  // TODO: choose correct item based on id property and send it
  res.json({request_id: req.params.id});
});
app.delete('/api/items/:id', (req, res) => {
  // TODO: delete correct item based on id property
  res.json({deleteid_id: req.params.id});
});
app.post('/api/items', (req, res) => {
  // TODO: add new item to items[] (viime viikon harkka)
  // TODO: add created item to response
  res.sendStatus(201);
});
app.put('/api/items/:id', (req, res) => {
  // TODO: modify correct item based on id property
  res.json({modify_id: req.params.id});
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});