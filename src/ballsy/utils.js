export const VECTOR_UP = { x: 0, y: -1 }
export const VECTOR_DOWN = { x: 0, y: 1 }
let DEBUG = null

export const init = (_DEBUG) => {
    DEBUG = _DEBUG
}

export const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomFloatFromInterval = (min, max) => {
    return Math.random() * (max - min) + min
}

export const degToRad = (angle) => {
    return (angle * Math.PI) / 180
}

export const radToDeg = (rad) => {
    return rad * 180 / Math.PI
}

export const addVector = (vectorA, vectorB) => {
    return {
        x: vectorA.x + vectorB.x,
        y: vectorA.y + vectorB.y
    }
}

export const subVector = (vectorA, vectorB) => {
    return {
        x: vectorA.x - vectorB.x,
        y: vectorA.y - vectorB.y
    }
}

export const getRandomAngleBetween = (angle1Deg, angle2Deg) => {
    const randomRad = randomFloatFromInterval(degToRad(angle1Deg), degToRad(angle2Deg))

    // console.log(randomRad, randomRad * 180 / Math.PI)
    return randomRad
}

export const getAngleBetweenVectors = (vector1, vector2) => {
    return radToDeg(Math.cosh(dotProduct(vector1, vector2) / (getMagXY(vector1.x, vector1.y) * getMagXY(vector2.x, vector2.y))))
}

export const getMagXY = (x, y) => {
    // console.log(x, y)

    const mag = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    return mag
}

export const normalizeVector = (vector) => {
    const mag = getMagXY(vector.x, vector.y)
    return {
        x: vector.x / mag,
        y: vector.y / mag
    }
}

export const rotateVector = (vector, angleDeg) => {
    const angle = angleDeg * Math.PI / 180
    return {
        x: Math.cos(angle) * vector.x - Math.sin(angle) * vector.y,
        y: Math.sin(angle) * vector.x + Math.cos(angle) * vector.y
    }
}

export const scaleVector = (vector, scaler) => {
    vector.x *= scaler
    vector.y *= scaler
    return vector
}

export const rotateVectorNormalized = (vector, angleDeg, scaler = 100) => {
    let normVec = normalizeVector(rotateVector(vector, angleDeg))
    normVec = scaleVector(normVec, scaler)
    return normVec
}

export const rotateVectorNormalizedAnchored = (anchor, vector, angleDeg, scaler = 100) => {
    let normVec = normalizeVector(rotateVector(vector, angleDeg))
    normVec = scaleVector(normVec, scaler)
    return addVector(anchor, normVec)
}

export const dist = (point1, point2) => {
    const distX = point1.x - point2.x;
    const distY = point1.y - point2.y;
    return Math.sqrt((distX * distX) + (distY * distY));
}

export const dotProduct = (vectorA, vectorB) => {
    return vectorA.x * vectorB.x + vectorA.y * vectorB.y
}

export const getProjection = (a, b, p) => {
    const ab = subVector(b, a)
    const ap = subVector(p, a)
    const dot = dotProduct(ap, ab) // scaler
    const ablen = getMagXY(ab.x, ab.y)
    const d = dot / Math.pow(ablen, 2)
    const toGo = scaleVector(ab, d)
    const goal = addVector(a, toGo)
    return goal
}

export const getProjectionAngled = (p3_new, p5_new, angle, updatedAngle, prevSeg, left) => {
    const leftOffset = left ? 90 : -90

    // Extend p3_ori up
    const p_ext = rotateVectorNormalizedAnchored(p5_new, rotateVector(VECTOR_UP, prevSeg.angle), 0, 400)

    // Project p3_new onto p_ext
    const proj = getProjection(p5_new, p_ext, p3_new)
    // drawLineCentered(p3_new, proj, "orange")

    // Get hyp of the formed triangle, with cah
    const ank = dist(p3_new, proj)
    if (ank < 0.1){
        // console.log("ank is small", ank)
        return rotateVectorNormalizedAnchored(p3_new, VECTOR_UP, updatedAngle, 1)
    }
    const cosinus = Math.cos((leftOffset - angle) * Math.PI / 180)
    const hyp = ank / cosinus

    // Rotate and extend vector from p3_new
    const p4_new = rotateVectorNormalizedAnchored(p3_new, VECTOR_UP, updatedAngle, hyp)
    // drawLineCentered(p3_new, p4_new)
    return p4_new
}

export const minmax = (one, two) => {
    let min, max
    if (one > two) {
        min = two
        max = one
    } else {
        min = one
        max = two
    }
    return { min, max }
}