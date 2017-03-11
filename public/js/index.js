var socket = io()
socket.on('connect', function() {
    console.log('Connected to server');

})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = document.createElement('LI')
    var nodeText = document.createTextNode(message.from + ':' + ' ' + message.text)
    li.appendChild(nodeText)
    document.querySelector('#messages').appendChild(li)
})


document.querySelector('#message-form').addEventListener('submit', function (e) {
    var input = document.querySelector('.message-input')
    e.preventDefault()
    socket.emit('createMessage', {
        from: 'User',
        text: input.value
    },function () {
        
    })
})