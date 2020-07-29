module.exports = class User {
    constructor(socket, username, ip) {
        this.socket = socket
        this.username = username
        this.ip = ip

        // Quiplash
        this.quiplash_has_answered = false
        this.quiplash_questions = []
        this.quiplash_answers = []
    }
}