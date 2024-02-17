const users =[];
//join users to chat
function userJoined(id,username,room){
    const user = {id,username,room};
    users.push(user);
    return user

}
//to get current users
function getCurrentUser(id){
    return users.find(user=>user.id == id);
}

//when user leaves
function userLeave(id){
    const index = users.findIndex(user=>user.id===id);
    if(index != -1){
        return users.splice(index,1)[0];
    }

}

//to get room users
function roomUsers(room){
    return users.filter(user =>user.room === room)
}



module.exports= {
    userJoined,
    getCurrentUser,
    userLeave,
    roomUsers
};