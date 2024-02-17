const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/formtmessage");
const { userJoined, getCurrentUser, userLeave, roomUsers } = require("./utils/users");




const app = express();
const server = http.createServer(app);
const io = socketio(server);


//to serve static files

app.use(express.static(path.join(__dirname,'public')));


//Run when client connects
io.on('connection',(socket) =>{

socket.on('joinRoom',({username,room})=>{
   const user = userJoined(socket.id,username,room);  
   socket.join(user.room)



  socket.emit('message',formatMessage('chatbot','welcome to chatestream'));

  //broadcast when a user connects
  socket.broadcast.to(user.room).emit('message',formatMessage('chatbot', `${user.username} has joined the chat`));
  io.to(user.room).emit('getRoomUsers',{
    users: roomUsers(user.room)
  })

});

  

  //Listen for chat msg
  socket.on("chatMessage", (msg)=>{
    const user = getCurrentUser(socket.id)
   io.to(user.room).emit("message",formatMessage(user.username, msg));
  })
  
  // when a user desconnects
  socket.on('disconnect',()=>{
    const user = userLeave(socket.id)
    if(user){
      io.to(user.room).emit("message",formatMessage('chatbot', `${user.username} has left the chat`));
      

      io.to(user.room).emit('getRoomUsers',{
        users: roomUsers(user.room)
      })
    
    }

    
  });


});





const port = 3000;
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })