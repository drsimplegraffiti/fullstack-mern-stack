require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const morgan = require("morgan")

connectDB();

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
  console.log(process.env.NODE_ENV);
});
