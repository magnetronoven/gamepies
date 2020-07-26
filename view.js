module.exports = {
    addUsernameToList(username) {
        const ul = document.querySelector("ul")
        ul.insertAdjacentHTML('beforeend', `<li>${username}</li>`)
    }
}