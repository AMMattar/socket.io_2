const { instrument } = require('@socket.io/admin-ui')
const { Socket } = require('socket.io')

const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080', "https://admin.socket.io"],
    }
})

io.on("connection", Socket => {
    console.log(Socket.id)
    Socket.on('send-message', (message, room) => {
        if (room === "") {
            Socket.broadcast.emit('receive-message', message)
        } else {
            Socket.to(room).emit('receive-message', message)
        }
    })
    Socket.on('join-room', (room, cb) => {
        Socket.join(room)
        cb(`Joined ${room}`)
    })
})

instrument(io, { auth: false })