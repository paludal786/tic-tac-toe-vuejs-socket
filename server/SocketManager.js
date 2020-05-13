const io = require('./index.js').io

const { SET_MOVE, VERIFY_USER, USER_CONNECTED, LOGOUT, USER_DISCONNECTED, USER_SIGNOUT, SEND_NOTIFICATION, RECEIVED_NOTIFICATION, USER_LIST, PRIVATE_ROOM } = require('./Event')

const { createUser } = require('./Factories')

let connectedUsers = {}

let getUsersList = {}


module.exports = function(socket) {

    console.log("------------------------------------------");
    console.log("Socket Id On SocketManager :-" + socket.id);
    console.log("------------------------------------------");

    //receiver verify user
    socket.on(VERIFY_USER, (nickname, callback) => {
        if (isUser(connectedUsers, nickname)) {
            callback({ isUser: true, user: null })
        } else {
            callback({ isUser: false, user: createUser({ name: nickname, socketId: socket.id, online: true }) })
        }
    })

    // socket.on(USER_LIST, (callback) => {
    //     callback({ list: connectedUsers })
    // })

    //connect new user with username
    socket.on(USER_CONNECTED, (user) => {
        user.socketId = socket.id
        connectedUsers = addUser(connectedUsers, user)
        socket.user = user;
        io.emit(USER_CONNECTED, connectedUsers); // emit all users
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
        io.emit(USER_SIGNOUT, user)
        console.log("Disconnect User Name", connectedUsers);
    })

    socket.on(SEND_NOTIFICATION, (user, currentUser) => {
        // console.log(user, currentUser);
        io.emit(RECEIVED_NOTIFICATION, user, currentUser);
    })

    socket.on(PRIVATE_ROOM, (sender, receiver, showBoard, showUsers) => {
        console.log(typeof(sender));
        io.emit(PRIVATE_ROOM, sender, receiver, showBoard, showUsers);
    })

    socket.on(SET_MOVE, (x, player) => {
        console.log(x, player);
        io.emit(SET_MOVE, x, player);
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