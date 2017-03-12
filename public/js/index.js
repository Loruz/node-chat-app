var socket = io()
socket.on('connect', function() {
    console.log('Connected to server');

})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

socket.on('newMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a')
    var template = $('#message-template').html()
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    })
    $('#messages').append(html)
})

socket.on('newLocationMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a')
    var template = $('#location-message-template').html()
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formatedTime
    })
    $('#messages').append(html)

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