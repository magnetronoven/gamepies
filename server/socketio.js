const User = require("./model/User")
const view = require("../view")

let users = []

module.exports = function(io) {
    io.on('connection', (socket) => newSocketConnection(socket));
}

function newSocketConnection(socket) {

    socket.on('disconnect', () => {
        // connections.splice(connections.indexOf(socket), 1)
        console.log("a user disconnected")
    })

    setSocketEvents(socket)
    getSocketEvents(socket)
}

function setSocketEvents(socket) {

}

function getSocketEvents(socket) {
    socket.on("user-connect", (username, callback) => {
        users.push(new User(socket, username))
        view.addUsernameToList(username)
        callback()
    })
}