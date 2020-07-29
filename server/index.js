const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = 3000
const User = require('../model/User')

module.exports = class Server {

    constructor(users, newUserCallback, gameObject) {
        this.newUserCallback = newUserCallback
        this.gameObject = gameObject
        this.users = users
        this.setExpress()
        io.on('connection', (socket) => this.newSocketConnection(socket));
    }

    setExpress() {
        app.use(express.static('server/public'))
        
        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/public/index.html')
        });
    
        http.listen(port, () => {
            console.log(`listening on localhost:${port}`)
        });
    }

    getIo() {
        return io
    }

    newSocketConnection(socket) {
    
        // If a user had disconnected
        for (let i = 0; i < this.users.length; i++) {
            if(this.users[i].ip === socket.request.connection.remoteAddress) {
                // socket.emit("we-allready-know-you")
                // Set the new socket to the allready known user
                this.users[i].socket = socket
                this.newUserCallback.call(this.gameObject, socket)
            }
        }
    
        socket.on('disconnect', () => {
            console.log("a user disconnected")
        })
    
        this.setSocketEvents(socket)
        this.getSocketEvents(socket)
    }
    
    setSocketEvents(socket) {
    
    }
    
    getSocketEvents(socket) {
        socket.on("user-connect", (username, callback) => {
    
            let ip = socket.request.connection.remoteAddress
            this.users.push(new User(socket, username, ip))
            this.renderUsers(this.users)
            this.newUserCallback.call(this.gameObject, socket)
    
            callback()
        })
    }

    renderUsers(users) {
        const ul = document.querySelector("ul")
        ul.innerHTML = ""
        users.forEach(user => {
            document.querySelector("ul").insertAdjacentHTML('beforeend', `<li>${user.username}</li>`)
        });
    }
    
}