const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const express = require('express')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000


let app = express()
let server = http.createServer(app)
let io = socketIO(server)


app.use(express.static(publicPath))


io.on('connection', (socket)=> {
    console.log('New user connected');

    socket.emit('newEmail', {
    	from: 'mike@example.com',
		text: 'Hei what up',
		createdAt: 123
	})

	socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
	})

	socket.emit('newMessage', {
		from:'user@example.com',
		text: 'Zinute',
		createdAt: 1212
	})

	socket.on('createMessage', (message) => {
        console.log('createMessage', message);
	})

    socket.on('disconnect', () => {
        console.log('User has disconnected');
    })
})




server.listen(port, ()=> {
	console.log('All ok!');
})