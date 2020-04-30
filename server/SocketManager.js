const io = require('./index.js').io

const { VERIFY_USER, USER_CONNECTED, LOGOUT, USER_DISCONNECTED } = require('./Event')

const { createUser } = require('./Factories')

let connectedUsers = {}


module.exports = function(socket) {

    console.log("------------------------------------------");
    console.log("Socket Id On SocketManager :-" + socket.id);
    console.log("------------------------------------------");

    //receiver verify user
    socket.on(VERIFY_USER, (nickname, callback) => {
        if (isUser(connectedUsers, nickname)) {
            callback({ isUser: true, user: null })
        } else {
            callback({ isUser: false, user: createUser({ name: nickname }) })
        }
    })

    //connect new user with username
    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user)
        socket.user = user;
        io.emit(USER_CONNECTED, connectedUsers);
        console.log(connectedUsers, 'all connected users');
    })


    //User disconnects
    socket.on('disconnect', () => {
        if ("user" in socket) {
            connectedUsers = removeUser(connectedUsers, socket.user.name)
            io.emit(USER_DISCONNECTED, connectedUsers)
            console.log("Disconnect", connectedUsers);
        }
    })

    //User logout
    socket.on(LOGOUT, (user) => {
        connectedUsers = removeUser(connectedUsers, user.name)
        io.emit(USER_DISCONNECTED, connectedUsers)
        console.log("Disconnect User Name", connectedUsers);
    })
}


function addUser(userList, user) {
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList
}

function removeUser(userList, username) {
    console.log(userList, username);

    let newList = Object.assign({}, userList)
    delete newList[username]
    return newList
}

function isUser(userList, username) {
    return username in userList
}