module.exports = class User {
    constructor(socket, username) {
        this.socket = socket
        this.username = username
    }
}