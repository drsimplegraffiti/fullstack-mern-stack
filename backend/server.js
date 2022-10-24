require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

const port = process.env.PORT || 4000;

app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
  console.log(process.env.NODE_ENV);
});
