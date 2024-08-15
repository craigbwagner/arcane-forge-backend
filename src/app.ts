const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRouter = require('./routes/users');

const app:Express = express();
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not defined.');
}

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

app.use(cors());
app.use(express.json());

app.use("/users", require("./routes/users", usersRouter));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
