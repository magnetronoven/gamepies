const User = require("./model/User")
const View = require("../view")

const viewObject = new View()
let users = []

module.exports = function(io) {
    io.on('connection', (socket) => newSocketConnection(socket));
}

function newSocketConnection(socket) {

    // If a user had disconnected
    for (let i = 0; i < users.length; i++) {
        if(users[i].ip === socket.request.connection.remoteAddress) {
            socket.emit("we-allready-know-you")
        }
    }

    socket.on('disconnect', () => {
        // users = users.filter(user => {
        //     return user.socket !== socket;
        // })
        console.log("a user disconnected")
    })

    setSocketEvents(socket)
    getSocketEvents(socket)
}

function setSocketEvents(socket) {

}

function getSocketEvents(socket) {
    socket.on("user-connect", (username, callback) => {

        let ip = socket.request.connection.remoteAddress;
        users.push(new User(socket, username, ip))
        viewObject.renderUsers(users)

        callback()
    })
}