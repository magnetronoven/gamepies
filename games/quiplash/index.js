const fs = require("fs")

module.exports = class Quiplash {
    constructor(io, users) {
        this.name = "quiplash"
        this.titlename = "Quiplash"
        this.io = io
        this.users = users
    }

    getHtmlContent() {
        return fs.readFileSync(`./games/${this.name}/index.html`, 'utf8')
    }

    startGame() {
        document.querySelector("h1").innerHTML = this.users[0].username

        this.users.forEach(user => {
            user.socket.on("testtest", () => {
                console.log("testtt")
            })
        });
        
    }
}