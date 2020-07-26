const fs = require("fs")

module.exports = class Quiplash {
    constructor() {
        this.name = "quiplash"
        this.titlename = "Quiplash"
    }

    getHtmlContent() {
        return fs.readFileSync(`./games/${this.name}/index.html`, 'utf8')
    }

}