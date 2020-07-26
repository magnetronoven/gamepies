// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const Server = require('./server')
let serverObject = new Server()
var ip = require("ip")

// games
const Quiplash = require('./games/quiplash')

let games = [
	new Quiplash()
]

window.addEventListener('DOMContentLoaded', () => {
	// serverObject = 
	document.querySelector(".server-details").innerHTML = `Server running on ${ip.address()}`
	setGames()
})

function setGames() {
	let gamesElementContainer = document.querySelector(".games")

	games.forEach(game => {
		gamesElementContainer.insertAdjacentHTML('beforeend', `<div>${game.name}</div>`)
	})
}