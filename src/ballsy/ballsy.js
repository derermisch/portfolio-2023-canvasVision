import '../css/main.css'
import Camera from "./camera.js"
import * as UTILS from "./utils"
import { Debug } from "./debug"
import { initPlayer, Player } from "./player"
import {
    createTouchOverlay, inputs, updateHorizontalAxis,
    resetInputs, initInputs
} from "./input"
import {
    initTracks, renderTracks, updateTracks,
    tracks, currentTrackInd, generateInitialTracks, score
} from './tracks'
import { initCollision, hasCollision, hasTrigger } from './collision'
import { showGameOverMenu, showGameStartMenus, showTextArea } from './menu'
import "./sounds"
// import { initUi, fillTextAt } from './ui'

// -- References --
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const cam = new Camera(ctx, { distance: 2000 }) // 2000 is good

// -- Global variables/settings --
let deltaTime = 0; // time since last frame in seconds
let trackDimensions = { width: 200, height: 500 }
ctx.font = '25px Arial';
ctx.lineWidth = 5
const playerSpeed = 5
const playerRotationSpeed = 3
const DEBUG_skipMenu = false
let touchEnabled = false

// -- Check if touch device --
const isTouchEnabled = () => {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

// -- Disable double tap to zoom for Ipad --
// https://stackoverflow.com/questions/37808180/disable-viewport-zooming-ios-10-safari?noredirect=1&lq=1
document.addEventListener("touchend", (event) => {
    event.preventDefault()
    event.target.click()
})

// -- Canvas resizing --
const resizeCanvas = async () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    // cam.distance = 2000
    cam.distance = cam.getDistanceBasedOnTrackHeight(trackDimensions.height, 2.5)
    cam.updateViewport()
    ctx.lineWidth = 5
    window.getSelection().removeAllRanges()
    createTouchOverlay(isTouchEnabled())

    document.querySelector(".gameMenu__menu__heading").addEventListener("click", () => {
        console.log("TEST")
    })
}
resizeCanvas()
window.addEventListener("resize", () => {
    resizeCanvas()
})
// -- Object initializations --
const center = { x: canvas.width / 2, y: canvas.height / 2 }
const DEBUG = new Debug(ctx, cam)
const player = new Player(center, 10, "red", playerRotationSpeed, playerSpeed);
UTILS.init(DEBUG)
initTracks(ctx, UTILS, DEBUG, 20, center, trackDimensions)
initPlayer(ctx, inputs, center, DEBUG, UTILS)
initCollision(ctx, player, tracks, UTILS, DEBUG, center)
// initUi(ctx, cam)
// initMenu(ctx, player, tracks, UTILS, DEBUG)

// -- Game loop --
let playing = true
let isRetry = false
let oldTimeStamp;
let fps;
let reqId;
let addSpeed = 0
let addRotation = 0
const gameLoop = (timeStamp) => {
    if (!playing) {
        const points = score

        // reset inputs first
        resetInputs()

        // reset tracks and player
        generateInitialTracks()
        player.reset()

        // clear screen, cancel game loop, show menu
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        cancelAnimationFrame(reqId)

        //For future: work out more elegant solution..
        //Menu logic shouldnt be here
        if (!isRetry) {
            showGameOverMenu(points)
        } else {
            showGameStartMenus()
        }
        isRetry = false
        return
    }
    // clear screen first, then start cam
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    cam.begin()

    // Time/Fps logic
    deltaTime = (timeStamp - oldTimeStamp) / 1000; // from ms to s
    oldTimeStamp = timeStamp;
    fps = Math.round(1 / deltaTime)

    // Input logic
    updateHorizontalAxis()

    // GameObject logic
    // const addSpeed = (score > 0) ? playerSpeed / 100
    player.move(deltaTime, addRotation, addSpeed)
    if (hasCollision(currentTrackInd)) {
        playing = false // condition for game over
    }
    if (hasTrigger(currentTrackInd)) {
        updateTracks()
    }
    renderTracks()
    player.render()

    // UI logic
    // fillTextAt(score)
    showTextArea(score)

    // Debug logic
    // DEBUG.showFPS(fps)
    // DEBUG.mousePosText(inputs.DEBUG_mousePos_x, inputs.DEBUG_mousePos_y)
    // DEBUG.mousePosTextScreenCoords(inputs.DEBUG_mousePos_x, inputs.DEBUG_mousePos_y)
    // DEBUG.showScreenDim()
    // DEBUG.showMessage()

    // Camera logic
    cam.moveTo(player.pos.x, player.pos.y)
    cam.end()

    reqId = requestAnimationFrame(gameLoop)
}

window.addEventListener("startGameLoop", (e) => {
    // document.body.style.cursor = "none"
    playing = true
    reqId = requestAnimationFrame(gameLoop)
}, true)

window.addEventListener("gameOver", (e) => {
    isRetry = e.detail.fromPaused
    playing = false
    addRotation = 0
    addSpeed = 0
}, true)

window.addEventListener("scoreIncreased", () => {
    // console.log("increased score")
    addSpeed = score * (5 / 100)
    addRotation = score * (0.5 / 100)
    // console.log("add speed: ", addSpeed, " add rot: ", addRotation)
}, true)

if (DEBUG_skipMenu) {
    initInputs()
    document.querySelector(".gameMenu__menu").style.visibility = "hidden"
    gameLoop()
}