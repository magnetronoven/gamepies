module.exports = class User {
    constructor(socket, username, ip) {
        this.socket = socket
        this.username = username
        this.ip = ip
    }
}