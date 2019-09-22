const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const message = (name, text) => ({name, text});

app.use(express.static(publicPath));

io.on('connection', socket => {

  socket.on('message:create', (data, callback) => {
    if (!message) {
       callback('message can\'t be emty');
    } else {
      io.emit('message:new', message('Admin', data.text))
      callback();
    }

    // socket.emit('newMessage', {
    //   text: data.value,
    //   date: new Date()
    // })
  })
})

server.listen(port, () => {

  console.log(` server has been started on port ${port}`)
})
