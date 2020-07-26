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

function getGame(gameName) {
	for (let i = 0; i < games.length; i++) {
		if(games[i].name === gameName) return games[i]
	}
}

window.addEventListener('DOMContentLoaded', () => {
	document.querySelector(".server-details").innerHTML = `Server running on ${ip.address()}`
	setGames()
})

function setGames() {
	let gamesElementContainer = document.querySelector(".games")

	games.forEach(game => {
		let gameElement = document.createElement("div")
		gameElement.innerHTML = game.titlename
		gameElement.addEventListener("click", () => startGame(game.name))
		gamesElementContainer.appendChild(gameElement)
	})
}

function startGame(gameName) {
	const gameElement = document.querySelector(".game")
	gameElement.innerHTML = getGame(gameName).getHtmlContent()
	gameElement.style.display = "block"
}