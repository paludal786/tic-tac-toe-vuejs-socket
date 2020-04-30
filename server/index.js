let app = require('http').createServer()
let io = module.exports.io = require('socket.io')(app)

const PORT = process.env.PORT || 4000

const SocketManager = require('./SocketManager')

io.on('connection', SocketManager)

app.listen(PORT, () => {
    console.log("Start Listener Connected On Port In Index(server side) :-" + PORT);
})