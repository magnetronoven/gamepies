(function() {
    const socket = io.connect()
    const form = document.querySelector(".user-form")
    const user_form = document.querySelector("section[data-section=user_form]")
    const waiting_room = document.querySelector("section[data-section=waiting_room]")
    const quiplash_questions = document.querySelector("section[data-section=quiplash_questions]")
    
    form && form.addEventListener("submit", (e) => {
        e.preventDefault()
        socket.emit("user-connect", e.target.name.value, showWaitingRoom)
    })

    document.querySelector("section[data-section=user_form]").style.display = "block"

    function showWaitingRoom() {
        user_form.style.display = "none"
        quiplash_questions.style.display = "none"
        waiting_room.style.display = "block"
    }

    socket.on("waiting-room", () => {
        showWaitingRoom()
    })

    quiplash(socket)
    
    // Quiplash ------------------------------------------------------------------------------------------
    // Game ------------------------------------------------------------------------------------------
    // Zone ------------------------------------------------------------------------------------------
    function quiplash(socket) {
        socket.on("quiplash-questions", (questions) => askQuestions(questions))
    
        function askQuestions(questions) {
            // Create HTML
            let quiplash_form = document.querySelector(".questions-form") 
            questions.forEach((question, index) => {
                quiplash_form.insertAdjacentHTML("afterbegin", `
                    <div class="question">
                        <label for="answer${index}" class="question-label">${question}</label>
                        <input name="answer${index}" id="answer${index}" type="text">
                    </div>
                `)
            })
            document.querySelector("section[data-section=user_form]").style.display = "none"
            document.querySelector("section[data-section=waiting_room]").style.display = "none"
            document.querySelector("section[data-section=quiplash_questions]").style.display = "block"
    
            quiplash_form.addEventListener("submit", (e) => {
                e.preventDefault()
                let answers = []
                for (let i = 0; i < e.target.length - 1; i++) {
                    answers.push(e.target[i].value)
                }
    
                console.log(answers)
                socket.emit("quiplash-filled-questions", answers)
            })
        }
    }
})()
