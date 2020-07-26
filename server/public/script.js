(function() {
    const socket = io.connect()
    const form = document.querySelector(".user-form")
    const user_form = document.querySelector("section[data-section=user_form]")
    const waiting_room = document.querySelector("section[data-section=waiting_room]")
    
    form && form.addEventListener("submit", (e) => {
        e.preventDefault()
        socket.emit("user-connect", e.target.name.value, showWaitingRoom)
    })

    document.querySelector("section[data-section=user_form]").style.display = "block"

    function showWaitingRoom() {
        user_form.style.display = "none"
        waiting_room.style.display = "block"
    }

    socket.on("we-allready-know-you", () => {
        showWaitingRoom()
    })

    document.querySelector(".testbutton").addEventListener("click", () => {
        socket.emit("testtest")
    })

})()