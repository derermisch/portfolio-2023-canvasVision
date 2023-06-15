/** @type{HTMLElement} */
let debugRect = null
const size = 16

export const drawDebugRect = (topPos, text = "D") => {
    if (!debugRect) {
        debugRect = document.createElement("div")
        debugRect.className = "debugRect"
        debugRect.style.backgroundColor = "red"
        debugRect.style.width = size + "px"
        debugRect.style.height = size + "px"
        debugRect.style.position = "absolute"
        debugRect.style.top = 0
        debugRect.style.left = `calc(50% - ${size / 2}px)`
        debugRect.style.paddingBlock = "unset"
        debugRect.style.paddingInline = "unset"
        document.querySelector(".sites").appendChild(debugRect)
    }
    debugRect.style.top = topPos + "px"
    debugRect.textContent = text
}