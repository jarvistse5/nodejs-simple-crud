require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

const database_url = process.env.DATABASE_URL;
const app_port = process.env.PORT || 5000;

mongoose.connect(database_url);
const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error);
});

db.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

app.use(express.json());
app.use(cors());

app.listen(app_port, () => {
    console.log(`Server started at port ${app_port}`);
});

app.use('/api', routes);