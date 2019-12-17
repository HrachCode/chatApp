var express = require('express')
var bodyParser = require('body-parser')
var app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose')
const MessageColecton = require('./models/MessageColection')
var port = process.env.PORT || 5000

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
//'mongodb+srv://hrach:erevan10@cluster0-htp6y.mongodb.net/test?retryWrites=true&w=majority'
const mongoURI = 'mongodb+srv://virap:erevan10@cluster0-vxh3h.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(
    mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true,
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

var Users = require('./routes/Users')

app.use('/users', Users)
app.post('/profile', (req, res) => {
  MessageColecton.aggregate (
  [
    {
      '$match': {}
    }, {
      '$sort': {
        'date': -1
      }
    }, {
      '$limit': 20
    }
  ])  
       
        .exec((err, messages) => {
        if (!err) {
          res.send(messages)

        }
      })
})
io.on('connection', function (socket) {

  const name = 'U' + (socket.id).toString().substr(1, 4);
  console.log('user connekted  ' + name)

  socket.on('msg', content => {
    const obj = {
      date: new Date(),
      content: content.content,
      username: content.username
    };

    MessageColecton.create(obj, err => {
      if (err) return console.error("MessageModel", err);
      io.sockets.emit('msgs', obj)

    });


  })

  socket.on('receiveHistory', () => {
    MessageColecton
      .find({})
      .sort({
        date: -1
      })
      .limit(30)
      .sort({
        date: 1
      })
      .lean()
      .exec((err, messages) => {
        if (!err) {
          let arr = messages.slice(-1).pop()
          io.sockets.emit("history", arr);

        }
      })
  })
  socket.on('create', function(room) {
    const obj = {
      date: new Date(),
      content: room.msg.content,
      username: room.msg.username
    };
    socket.join(room.room);
    io.sockets.in(room.room).emit('new_msg',
     {data:obj,roomNuber:room.room});
       
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

});




server.listen(port, function () {
  console.log('Server is running on port: ' + port)
})