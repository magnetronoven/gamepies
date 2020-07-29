// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const Server = require('./server')
const ip = require("ip")
const User = require('./model/User')

// games
const Quiplash = require('./games/quiplash')

window.addEventListener('DOMContentLoaded', () => {
	document.querySelector(".server-details").innerHTML = `Server running on ${ip.address()}`
	let gamepies = new Gamepies()
})

class Gamepies {
	constructor() {
		this.users = []
		this.server = new Server(this.users, this.newUserSetEvents, this)
		this.io = this.server.getIo()
		this.games = [
			new Quiplash(this.io, this.users),
		]
		this.renderGamesOnHomeScreen()
		this.activeGame = null
	}

	getGame(gameName) {
		for (let i = 0; i < this.games.length; i++) {
			if(this.games[i].name === gameName) return this.games[i]
		}
	}

	newUserSetEvents(socket) {
		// Set all the events needed in the games
		this.games.forEach(game => {
			game.setSocketEvents(socket)
		})

		console.log(this.activeGame)

		if(this.activeGame !== null) {
			let activeGame = this.getGame(this.activeGame)

			if(activeGame.gameState !== null) {
				// Go to gamestate
				activeGame.playerReconnect(socket)
			} else {
				// Go to waiting screen
				socket.emit("waiting-room")
			}
		} else {
			socket.emit("waiting-room")
		}
	}

	renderGamesOnHomeScreen() {
		let gamesElementContainer = document.querySelector(".games")
	
		this.games.forEach(game => {
			let gameElement = document.createElement("div")
			gameElement.innerHTML = game.titlename
			gameElement.addEventListener("click", () => this.startGame(game.name))
			gamesElementContainer.appendChild(gameElement)
		})
	}

	startGame(gameName) {
		const game = this.getGame(gameName)
		const gameElement = document.querySelector(".game")
		gameElement.innerHTML = game.getHtmlContent()
		gameElement.style.display = "block"
		document.querySelector(".start-screen").style.display = "none"
		this.activeGame = gameName
		game.startGame()
	}
}