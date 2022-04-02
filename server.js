const express = require('express');
const path = require('path');
const {readdirSync} = require('fs');

const publicDirectory = path.join(__dirname, '../dist');

const app = express();
app.use(express.static(publicDirectory));
app.get('/', function (req, res) {
  console.log(readdirSync(__dirname));
  res.sendFile(path.join(publicDirectory, "index.html"));
})



app.listen(process.env.PORT || 3000);