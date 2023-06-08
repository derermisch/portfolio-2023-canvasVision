import scoreIncreasedSound from "./sounds/scoreIncreased.wav"
import playerCrashedSound from "./sounds/playerCrashed.wav"

const scoreIncreasedAudio = new Audio(scoreIncreasedSound)
const playerCrashedAudio = new Audio(playerCrashedSound)

window.addEventListener("scoreIncreased", () => {
    scoreIncreasedAudio.play()
}, true)

window.addEventListener("playerCrashed", () => {
    playerCrashedAudio.play()
}, true)