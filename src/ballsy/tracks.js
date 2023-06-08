/** @type{CanvasRenderingContext2D} */
let ctx = null
let UTILS = null
let DEBUG = null
let center
let generatedTracksAmount = 5
export let tracks = Array.from({ length: generatedTracksAmount }, () => null)
export let currentTrackInd = 0
export let score = 0
let trackDimensions = { width: 200, height: 400 }

// FOR DEBUG
const angleArr = [0, 0, -90, -90, -90, 0, 0]
let currAngleInd = 0

export const initTracks = (_ctx, _UTILS, _DEBUG, _trackAmount = 5, _center = { x: 0, y: 0 },
    _trackDimensions = { width: 200, height: 400 }) => {
    ctx = _ctx
    UTILS = _UTILS
    DEBUG = _DEBUG
    generatedTracksAmount = _trackAmount
    tracks = Array.from({ length: generatedTracksAmount }, () => null)
    center = _center
    trackDimensions = _trackDimensions
    generateInitialTracks()
}
let logAm = generatedTracksAmount
let log = 0

export class TrackSegment {
    constructor(prevSeg = null, startSegment = false,
        trackWidth = trackDimensions.width, trackHeight = trackDimensions.height,
        pos = { x: 0, y: 0 }, angle = 0) {

        this.pos = { x: pos.x, y: pos.y }
        this.trackWidth = trackWidth
        this.trackHeight = trackHeight

        this.isStartSegment = startSegment
        this.orgAngle = angle

        this.angle = angle
        // console.log("initial angle ", this.angle)
        if (prevSeg) {
            // console.log("prevSeg ", prevSeg.angle)
            this.angle += prevSeg.angle
            // console.log("angle now is ", this.angle)
        }
        // console.log("\n")
        if (startSegment) {
            // Left side, bottom top
            this.p1 = { x: pos.x - trackWidth / 2, y: pos.y }
            this.p2 = { x: this.p1.x, y: pos.y - trackHeight }

            // Right side, bottom top
            this.p3 = { x: this.p2.x + trackWidth, y: this.p2.y }
            this.p4 = { x: this.p3.x, y: this.p1.y }

            //just for collision
            this.p5 = this.p4
        }
        if (prevSeg && angle < 0) {
            if (prevSeg.orgAngle < 0 || prevSeg.isStartSegment) {
                this.p1 = prevSeg.p2
                this.p5 = prevSeg.p3
            }
            else {
                this.p1 = prevSeg.p3
                this.p5 = prevSeg.p2
            }
            this.p2 = UTILS.rotateVectorNormalizedAnchored(this.p1, UTILS.VECTOR_UP, this.angle, trackHeight)
            this.p3 = UTILS.rotateVectorNormalizedAnchored(this.p2, UTILS.VECTOR_UP, 90 + this.angle, trackWidth)
            this.p4 = UTILS.getProjectionAngled(this.p3, this.p5, angle, this.angle, prevSeg, true)
            this.pos = this.p5
        }
        if (prevSeg && angle >= 0) {
            // Segment is angled to the right
            if (prevSeg.orgAngle < 0 || prevSeg.isStartSegment) {
                this.p1 = prevSeg.p3
                this.p5 = prevSeg.p2
            }
            else {
                this.p1 = prevSeg.p2
                this.p5 = prevSeg.p3
            }
            this.p2 = UTILS.rotateVectorNormalizedAnchored(this.p1, UTILS.VECTOR_UP, this.angle, trackHeight)
            this.p3 = UTILS.rotateVectorNormalizedAnchored(this.p2, UTILS.VECTOR_UP, -90 + this.angle, trackWidth)
            this.p4 = UTILS.getProjectionAngled(this.p3, this.p5, angle, this.angle, prevSeg, false)
            this.pos = this.p5
        }
    }
    render() {
        ctx.beginPath()

        ctx.moveTo(this.p1.x, this.p1.y)
        ctx.lineTo(this.p2.x, this.p2.y)

        ctx.moveTo(this.p3.x, this.p3.y)
        ctx.lineTo(this.p4.x, this.p4.y)

        if (this.isStartSegment) {
            ctx.stroke()
            const oldFill = ctx.fillStyle
            ctx.beginPath()
            ctx.moveTo(this.p1.x, this.p1.y)
            ctx.lineTo(this.p2.x, this.p2.y)
            ctx.lineTo(this.p3.x, this.p3.y)
            ctx.lineTo(this.p4.x, this.p4.y)
            ctx.closePath()
            ctx.fillStyle = "lightgray"
            ctx.fill()
            ctx.fillStyle = oldFill
            return
        }

        ctx.moveTo(this.p4.x, this.p4.y)
        ctx.lineTo(this.p5.x, this.p5.y)

        ctx.stroke()

        // Fill polygon
        const oldFill = ctx.fillStyle
        ctx.beginPath()
        ctx.moveTo(this.p1.x, this.p1.y)
        ctx.lineTo(this.p2.x, this.p2.y)
        ctx.lineTo(this.p3.x, this.p3.y)
        ctx.lineTo(this.p4.x, this.p4.y)
        ctx.lineTo(this.p5.x, this.p5.y)
        ctx.closePath()
        ctx.fillStyle = "lightgray"
        ctx.fill()
        ctx.fillStyle = oldFill

        // ctx.fillRect(this.pos.x, this.pos.y, 20, 20)

        // Trigger
        // DEBUG.drawLineDirect(this.p5, this.p1, "blue")

        //Collisions
        // DEBUG.drawLineDirect(this.p1, this.p2, "orange")
        // DEBUG.drawLineDirect(this.p3, this.p4, "orange")
        // DEBUG.drawLineDirect(this.p4, this.p5, "orange")
    }
}

//FOR DEBUG
const getFromAngleArr = () => {
    const angle = angleArr[currAngleInd++]
    if (currAngleInd > angleArr.length - 1) {
        currAngleInd = 0
    }
    // console.log("angle is ", angle, currAngleInd)
    return angle
}

const checkForOverlap = async () => {
    // it takes 3x 90 deg to have a possible intersection with old parts of the track
    // => the last 3 can be excluded from range
    // For now: test on all (TODO: change later for performance)
    const lastTrack = tracks[tracks.length - 1]
}

export const getNextTrack = (prevTrack) => {
    // const angle = UTILS.getRandomAngleBetween(-45, 45)
    // const angle = 40
    const angle = UTILS.randomIntFromInterval(-90, 90)
    // const angle = getFromAngleArr()
    const newTrack = new TrackSegment(prevTrack, false,
        prevTrack.trackWidth, prevTrack.trackHeight,
        { x: prevTrack.pos.x, y: prevTrack.pos.y - prevTrack.trackHeight }, angle)
    return newTrack
}

export const generateInitialTracks = () => {
    score = 0
    tracks.forEach(track => track = null)
    currentTrackInd = 0
    const beginningTrack = new TrackSegment(null, true, trackDimensions.width,
        trackDimensions.height, { x: center.x, y: center.y })
    tracks[0] = beginningTrack
    for (let i = 1; i < tracks.length; i++) {
        // console.log("generating track..")
        tracks[i] = getNextTrack(tracks[i - 1])
    }
}

export const renderTracks = async () => {
    // Current (4) tracks are rendered seperate, for overlapping @intersections
    // e.g: Beginning: [R, R, R, N, N, N, N]
    //      Then:      [N, N, R, R, R, R, N]

    for (let i = 0; i < currentTrackInd - 1; i++) {
        tracks[i].render()
    }
    for (let i = currentTrackInd + 3; i < tracks.length; i++) {
        tracks[i].render()
    }
    if (currentTrackInd > 0){
        tracks[currentTrackInd - 1].render()
    }
    for (let i = currentTrackInd; i < currentTrackInd + 3; i++) {
        tracks[i].render()
    }
}

const scoreIncreasedEvent = new CustomEvent("scoreIncreased")
export const updateTracks = () => {
    if (tracks === undefined) return
    window.dispatchEvent(scoreIncreasedEvent)
    if (currentTrackInd < Math.round(generatedTracksAmount / 2) - 1) { //"middle" of arr not reached yet
        score++
        currentTrackInd++
        return
    }
    tracks.push(getNextTrack(tracks[tracks.length - 1]))
    tracks.shift()
    currentTrackInd = Math.round(generatedTracksAmount / 2) - 1 // Current Is always the middle of arr
    score++
}
// export const updateTracks = (playerYpos) => {
//     if (tracks === undefined) return
//     if (playerYpos <= tracks[Math.round(generatedTracksAmount / 2)].pos.y) {
//         tracks.push(getNextTrack(tracks[tracks.length - 1]))
//         tracks.shift()
//         currentTrackInd = Math.round(generatedTracksAmount / 2) - 1 // Current Is always the middle of arr
//         score++
//     } else if (playerYpos <= tracks[currentTrackInd + 1].pos.y) { // For first tracks until middle
//         currentTrackInd += 1
//         score++
//     }
// }