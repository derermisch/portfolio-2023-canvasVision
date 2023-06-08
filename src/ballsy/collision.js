/** @type{CanvasRenderingContext2D} */
let ctx
let player
let tracks
let currentTrackInd = 0
let UTILS
let DEBUG
const playerCrashedEvent = new CustomEvent("playerCrashed")

export const initCollision = (_ctx, _player, _tracks, _UTILS, _DEBUG) => {
    ctx = _ctx
    player = _player
    tracks = _tracks
    UTILS = _UTILS
    DEBUG = _DEBUG
}

export const hasCollision = (_currentTrackInd) => {
    // First: get candidate
    currentTrackInd = _currentTrackInd
    // console.log(currentTrackInd)
    // DEBUG.drawLine({ x: player.pos.x, y: player.pos.y },
    //     { x: tracks[currentTrackInd].pos.x, y: tracks[currentTrackInd].pos.y })
    const currTrack = tracks[currentTrackInd]
    // console.log(currTrack.pos.x , currTrack.pos.y)
    if (COL_lineCircle(currTrack.p1, currTrack.p2, player.pos, player.radius) ||
        COL_lineCircle(currTrack.p3, currTrack.p4, player.pos, player.radius) ||
        COL_lineCircle(currTrack.p4, currTrack.p5, player.pos, player.radius)) {
        window.dispatchEvent(playerCrashedEvent)
        return true
    }
    return false
}

export const hasTrigger = (_currentTrackInd) => {
    currentTrackInd = _currentTrackInd + 1 // needs to check for next track
    const currTrack = tracks[currentTrackInd]
    // console.log(currTrack)
    if (COL_lineCircle(currTrack.p5, currTrack.p1, player.pos, player.radius)) {
        return true
    }
    return false
}

const COL_circleCircle = (point1 = { x: 0, y: 0 }, point2 = { x: 0, y: 0 }, radius1, radius2) => {
    const dist = UTILS.dist(point1, point2)
    const colDist = radius1 + radius2
    if (dist <= colDist) { return true } else { return false }
}

const COL_linePoint = (point = { x: 0, y: 0 }, lineP1 = { x: 0, y: 0 }, lineP2 = { x: 0, y: 0 }) => {
    const d1 = UTILS.dist(point, lineP1)
    const d2 = UTILS.dist(point, lineP2)
    const lineLen = UTILS.dist(lineP1, lineP2)
    const buffer = 0.1
    if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) { return true } else { return false }
}

const COL_lineCircle = (lineP1 = { x: 0, y: 0 }, lineP2 = { x: 0, y: 0 }, circlePos = { x: 0, y: 0 }, radius) => {
    if (COL_circleCircle(lineP1, circlePos, radius) || COL_circleCircle(lineP2, circlePos, radius)) return true
    const lineLen = UTILS.dist(lineP1, lineP2)
    const dot = (((circlePos.x - lineP1.x) * (lineP2.x - lineP1.x)) + ((circlePos.y - lineP1.y) * (lineP2.y - lineP1.y)))
        / Math.pow(lineLen, 2);
    const closestPoint = {
        x: lineP1.x + (dot * (lineP2.x - lineP1.x)),
        y: lineP1.y + (dot * (lineP2.y - lineP1.y))
    }
    if (!COL_linePoint(closestPoint, lineP1, lineP2)) return false
    // ctx.fillRect(closestPoint.x, closestPoint.y, 20, 20)
    // DEBUG.drawLine(player.pos, closestPoint, "blue")
    // DEBUG.showMessage(`x:${closestPoint.x}, y:${closestPoint.y}, dot: ${dot}`)
    const dist = UTILS.dist(circlePos, closestPoint)
    if (dist <= radius) {
        // DEBUG.showMessage("COLLIDING")
        return true
    }
    return false
}