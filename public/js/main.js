const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const userList = document.getElementById("users");

console.log(userList)

//Get username and room
// const { username , room} = Qs.parse(window.location.search,{
//     ignorQueryPrefix : true
//   });
//   console.log( room,username);
//console.log(window.location.search)

 const myvlaues = window.location.search;
 const urlValue =new URLSearchParams(myvlaues);
 console.log("urlval:",urlValue);
 
const username = urlValue.get('username');
const room = urlValue.get('room');
console.log(username,room);


//stram video part
let vidUrl = room;
let finURL = vidUrl.slice(16);
let val = "https://youtube.com/embed";
console.log(finURL);

let val1 = val.concat(finURL);
const el = document.createElement('iframe')
el.setAttribute('src',val1)
el.setAttribute('width',"100%")
el.setAttribute('height',"100%")


const container = document.getElementById('container')
container.appendChild(el)
////



const socket = io();
socket.emit('joinRoom',{username,room});

socket.on('message', message =>{
    //console.log(message)
   outPutmessage(message);
   chatMessage.scrollTop = chatMessage.scrollHeight;
});



//display room users
socket.on('getRoomUsers',({users})=>{
    console.log(users)

    outputUsers(users);

    console.log(userList)

})



//Messageing
chatForm.addEventListener('submit',e=> {
    e.preventDefault();
    const msg =e.target.elements.msg.value;
  
    socket.emit("chatMessage", msg)
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

    
})
//output message to clients
function outPutmessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username} </p>
    <p class="text">
       ${message.text}
    </p>`

    document.querySelector('.chat-messages').appendChild(div);
};


function outputUsers(users){
  userList.innerHTML = `${users.map(user=>  `<option>${user.username}</option>`).join('')}`
}

