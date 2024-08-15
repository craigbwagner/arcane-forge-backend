"use strict";
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
dotenv.config();
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});
app.use(cors());
app.use(express.json());
// app.get('/', (req, res) => {
//   res.send('Hello, TypeScript Node Express!');
// });
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
