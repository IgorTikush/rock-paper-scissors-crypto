const express = require('express');
const path = require('path');

const publicDirectory = path.join(__dirname, '../dist')

const app = express()

app.get('/', function (req, res) {
  res.sendFile(path.join(publicDirectory, "index.html"))
})

app.use(express.static(publicDirectory))

app.listen(process.env.PORT || 3000)