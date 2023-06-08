const gameMenuMenuEle = document.querySelector(".gameMenu__menu")
const gameMenuHudEle = document.querySelector(".gameMenu__hud")
const gameMenuPlayingEle = document.querySelector(".gameMenu__playing")
const gameMenuPausedEle = document.querySelector(".gameMenu__paused")
const gameMenuGameoverEle = document.querySelector(".gameMenu__gameOver")
const gameMenuGoBtnEle = document.querySelector(".gameMenu__playing__goBtn")

const startGameLoopEvent = new CustomEvent("startGameLoop")
const unlockMovementEvent = new CustomEvent("unlockMovement")
const gameOverEvent = new CustomEvent("gameOver", { detail: { fromPaused: false } })
const pauseGameEvent = new CustomEvent("gamePaused")

const playing_score = document.querySelector(".gameMenu__hud__score")

let menuIsOpen = false
let goButtonsWasPressed = false
let gameHasStarted = false

// -- Event listeners for Buttons, trigger state events --
document.querySelector(".gameMenu__menu__startBtn").addEventListener("click", function () {
    showGameStartMenus()
})
document.querySelector(".gameMenu__playing__goBtn").addEventListener("click", function () {
    this.dispatchEvent(unlockMovementEvent)
    this.style.visibility = "hidden"
    goButtonsWasPressed = true
})
document.querySelector(".gameMenu__gameOver__buttons__retry").addEventListener("click", function () {
    this.dispatchEvent(gameOverEvent)
    showGameStartMenus()
})
document.querySelector(".gameMenu__paused__buttons__retry").addEventListener("click", function () {
    togglePausedMenu()
    gameOverEvent.detail.fromPaused = true
    this.dispatchEvent(gameOverEvent)
    gameOverEvent.detail.fromPaused = false
})
document.querySelector(".gameMenu__paused__buttons__quit").addEventListener("click", function () {
    togglePausedMenu()
    this.dispatchEvent(gameOverEvent)
})
document.querySelector(".gameMenu__gameOver__buttons__menu").addEventListener("click", function () {
    this.dispatchEvent(gameOverEvent)
    showMainMenu();
})
document.querySelector(".gameMenu__hud__navBars").addEventListener("click", function () {
    togglePausedMenu();
})
window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        if (!gameHasStarted) return
        togglePausedMenu()
    }
})

// -- Menu states --
const resetBools = (goBtn = false, menu = false, gameStarted = false) => {
    goButtonsWasPressed = goBtn
    menuIsOpen = menu
    gameHasStarted = gameStarted
}

export const showMainMenu = () => {
    gameMenuMenuEle.style.visibility = "visible"
    gameMenuHudEle.style.visibility = "hidden"
    gameMenuPlayingEle.style.visibility = "hidden"
    gameMenuPausedEle.style.visibility = "hidden"
    gameMenuGameoverEle.style.visibility = "hidden"
    gameMenuGoBtnEle.style.visibility = "hidden"
    resetBools()
}

export const showGameStartMenus = () => {
    gameMenuMenuEle.style.visibility = "hidden"
    gameMenuHudEle.style.visibility = "visible"
    gameMenuPlayingEle.style.visibility = "visible"
    gameMenuPausedEle.style.visibility = "hidden"
    gameMenuGameoverEle.style.visibility = "hidden"
    gameMenuGoBtnEle.style.visibility = "visible"
    resetBools(false, false, true)
    document.dispatchEvent(startGameLoopEvent)
    gameHasStarted = true
}

export const showGameOverMenu = (score) => {
    gameMenuMenuEle.style.visibility = "hidden"
    gameMenuHudEle.style.visibility = "hidden"
    gameMenuPlayingEle.style.visibility = "hidden"
    gameMenuPausedEle.style.visibility = "hidden"
    gameMenuGameoverEle.style.visibility = "visible"
    gameMenuGoBtnEle.style.visibility = "hidden"
    resetBools()
    document.querySelector(".gameMenu__gameOver__textArea").textContent = "SCORE: " + score
    // document.dispatchEvent(gameOverEvent)
}

const togglePausedMenu = () => {
    const navBars = document.querySelector(".gameMenu__hud__navBars")
    document.dispatchEvent(pauseGameEvent)
    if (!menuIsOpen) {
        gameMenuPausedEle.style.visibility = "visible"
        gameMenuGoBtnEle.style.visibility = "hidden"
        navBars.classList.toggle("active")
        gameMenuPausedEle.classList.toggle("active")
        menuIsOpen = true
    } else {
        gameMenuPausedEle.style.visibility = "hidden"
        if (goButtonsWasPressed) {
            gameMenuGoBtnEle.style.visibility = "hidden"
        } else { // at start of game, gobutton should still be there
            gameMenuGoBtnEle.style.visibility = "visible"
        }
        navBars.classList.toggle("active")
        gameMenuPausedEle.classList.toggle("active")
        menuIsOpen = false
    }
}

export const showTextArea = (score = "0") => {
    playing_score.textContent = score
}