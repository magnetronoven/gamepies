const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const socketio = require('./socketio');
const port = 3000

module.exports = function() {
    app.use(express.static('server/public'))
    
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    });

    socketio(io);
    
    http.listen(port, () => {
        console.log(`listening on localhost:${port}`)
    });
}