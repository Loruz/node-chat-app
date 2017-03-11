var socket = io()
socket.on('connect', function() {
    console.log('Connected to server');

})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = document.createElement('li')
    var nodeText = document.createTextNode(message.from + ':' + ' ' + message.text)
    li.appendChild(nodeText)
    document.querySelector('#messages').appendChild(li)
})

socket.on('newLocationMessage', function (message) {
    var li = document.createElement('li')
    var a = document.createElement('a')
    var nodeText = document.createTextNode('My current location')
    var liText = document.createTextNode(message.from + ':')
    a.appendChild(nodeText)
    a.setAttribute('target', '_blank')
    a.setAttribute('href', message.url)
    li.appendChild(liText)
    li.appendChild(a)
    document.querySelector('#messages').appendChild(li)

})

document.querySelector('#message-form').addEventListener('submit', function (e) {
    var input = document.querySelector('.message-input')
    e.preventDefault()
    socket.emit('createMessage', {
        from: 'User',
        text: input.value
    },function () {
        input.value = ''
    })
})

var locationButton = document.querySelector('#send-location')

locationButton.addEventListener('click', function () {
    if (!navigator.geolocation) {
       return alert('Geolocation not supported by you browser.')
    }

    locationButton.disabled = true
    locationButton.textContent = 'Sending location..'

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttribute('disabled')
        locationButton.textContent = 'Send location'
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        console.log(position);
    }, function () {
        alert('Unable to fetch location.')
    })
})