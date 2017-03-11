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

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat app',
        createdAt: new Date().getTime()

    })

    socket.broadcast.emit('newMessage', {
    	from: 'Admin',
		text: 'New user joined',
		createdAt: new Date().getTime()
    })


	socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
        	from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})


		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text
		// 	createdAt: new Date().getTime()
		// })

	})

    socket.on('disconnect', () => {
        console.log('User has disconnected');
    })
})




server.listen(port, ()=> {
	console.log('All ok!');
})