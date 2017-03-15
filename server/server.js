const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const express = require('express')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
let app = express()
let server = http.createServer(app)
let io = socketIO(server)


app.use(express.static(publicPath))


io.on('connection', (socket) => {
    console.log('New user connected');


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room is required')
        }

        socket.join(params.room)

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))
        callback()
    })

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback()

    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })

    socket.on('disconnect', () => {
        console.log('User has disconnected');
    })
})


server.listen(port, () => {
    console.log('All ok!');
})