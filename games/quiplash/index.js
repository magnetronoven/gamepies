const fs = require("fs")

module.exports = class Quiplash {
    constructor(io, users) {
        this.name = "quiplash"
        this.titlename = "Quiplash"
        this.io = io
        this.users = users
        this.data = this.getData()
        this.questions = null
        this.gameState = null
    }

    getHtmlContent() {
        return fs.readFileSync(`./games/${this.name}/index.html`, 'utf8')
    }

    getData() {
        return JSON.parse(fs.readFileSync(`./games/${this.name}/data.json`, 'utf8'))
    }

    startGame() {
        this.gameState = this.startGameSocketEvent
        this.questions = this.pickRandomQuestions(this.users.length)
        this.giveUsersQuestions()
        this.renderWaitingPlayers()

        this.showSection("waiting_players")

        // Send start message with the questions
        this.users.forEach(user => {
            this.startGameSocketEvent(user.socket)
        });
    }

    showSection(sectionName) {
        let quiplash_sections = document.querySelectorAll(".quiplash-section")
        quiplash_sections.forEach(section => {
            section.style.display = "none"
        })

        document.querySelector(`.${sectionName}`).style.display = "block"
    }

    startGameSocketEvent(socket) {
        let user = this.getUserBySocket(socket)

        // If user reconnect, check if he has allready answered
        if(user.quiplash_has_answered) {
            socket.emit("waiting-room")
        } else {
            socket.emit("quiplash-questions", user.quiplash_questions)
        }
    }

    setSocketEvents(socket) {
        socket.on("quiplash-filled-questions", answers => {
            console.log(answers)
            let user = this.getUserBySocket(socket)
            user.quiplash_answers = answers
            user.quiplash_has_answered = true
            this.renderWaitingPlayers()

            socket.emit("waiting-room")

            // If all users have answered continue
            if(this.allUsersHaveAnswered()){
                this.startAnswerRound()
            }
        })
    }

    startAnswerRound() {
        this.showSection("answers")
        console.log("Doneee")

        const qustion_element = document.querySelector(".answers_question")
        const answers_element = document.querySelectorAll(".answers_answer")
        const next_button = document.querySelector(".next-button")

        for (let i = 0; i < this.questions.length; i++) {
            await showAnswer(i)
        }

        async function showAnswer(i) {
            return new Promise((res) => {
                let times_clicked = 0
                answers_element.forEach(a => a.innerHTML = "")
                qustion_element.innerHTML = this.questions[i]

                next_button.addEventListener("click", () => {
                    times_clicked++
                    if(times_clicked === 1) {
                        // answers_element[0]
                        // Maak de antwoorden functie
                    }
                })
            })
        }
    }

    allUsersHaveAnswered() {
        for (let i = 0; i < this.users.length; i++) {
            if(!this.users[i].quiplash_has_answered) {
                return false
            }
        }
        return true
    }

    renderWaitingPlayers() {
        const waiting_players_container = document.querySelector(".waiting_players")
        waiting_players_container.innerHTML = ""

        this.users.forEach(user => {
            if(user.quiplash_has_answered) {
                waiting_players_container.insertAdjacentHTML('beforeend', `<li>${user.username} Done!</li>`)
            } else {
                waiting_players_container.insertAdjacentHTML('beforeend', `<li>${user.username}</li>`)
            }
        })
    }

    getUserBySocket(socket) {
        for (let i = 0; i < this.users.length; i++) {
            if(this.users[i].socket === socket) return this.users[i]            
        }
    }

    pickRandomQuestions(numberOfQuestions) {
        let res = this.data.questions.sort(function() {
            return 0.5 - Math.random();
        })

        return res.slice(0, numberOfQuestions)
    }

    giveUsersQuestions() {
        const numberOfQuestions = 2
        for (let i = 0; i < this.users.length; i++) {
            for (let j = 0; j < 2; j++) {
                this.users[i].quiplash_questions.push(this.questions[(i + j) % this.questions.length])
            }
        }
    }
    
    playerReconnect(socket) {
        this.gameState(socket)
    }
}