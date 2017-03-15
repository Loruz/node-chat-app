const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const express = require('express')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')

let app = express()
let server = http.createServer(app)
let io = socketIO(server)
let users = new Users()


app.use(express.static(publicPath))


io.on('connection', (socket) => {
    console.log('New user connected');


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room is required')
        }

        socket.join(params.room)
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)

        io.to(params.room).emit('updateUserList', users.getUserlist(params.room))
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))
        callback()
    })

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id)
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
        }
        callback()
    })

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id)
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }
    })

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id)
       if(user) {
           io.to().emit('updateUserList', users.getUserlist(user.room))
           io.to().emit('newMessage', generateMessage('Admin', `${user.name} has left the building.`))
       }
    })
})


server.listen(port, () => {
    console.log('All ok!');
})