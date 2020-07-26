module.exports = class View {
    addUsernameToList(username) {
        const ul = document.querySelector("ul")
        ul.insertAdjacentHTML('beforeend', `<li>${username}</li>`)
    }

    renderUsers(users) {
        const ul = document.querySelector("ul")
        ul.innerHTML = ""
        users.forEach(user => {
            this.addUsernameToList(user.username)
        });
    }
}