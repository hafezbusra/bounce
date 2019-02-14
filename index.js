var express = require('express')
var app = express()

const path = require("path")
app.use(express.static(path.join(__dirname, "/")))

app.get('/', function (req, res) {
  res.sendFile('index.html', {root : __dirname + '/views'});
})
 
app.listen(3000)