import express from 'express';
// read .env file
import 'dotenv/config';
import mediaRouter from './routes/media-router.js';
import userRouter from './routes/user-router.js';
import likesRouter from './routes/likes-router.js';

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const app = express();

//console.log(process.env);

// parse json from request bodies
app.use(express.json());

// Serve static files ('public' folder -> http server root)
app.use('/', express.static('public'));
app.use('/uploads', express.static('uploads'));

// Api endpoints
app.use('/api/media', mediaRouter);

// Users endpoints
app.use('/api/users', userRouter);

// likes endpoints
app.use('/api/likes', likesRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});