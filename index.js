const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const buildPath = path.join(__dirname, 'build'); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(buildPath));
app.get('/', (req, res) => { res.sendFile(path.resolve(buildPath, 'index.html')) });

app.listen()