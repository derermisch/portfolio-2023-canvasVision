export class Debug {
    constructor(ctx, cam, message = "") {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx
        this.cam = cam
        this.message = message
        this.debuggedOnce = false
        this.center = {
            x: this.ctx.canvas.width / 2,
            y: this.ctx.canvas.height / 2
        }
    }
    mousePosText = (x, y) => {
        const camCoords = this.cam.screenToWorld(x, y)
        this.ctx.fillRect(camCoords.x, camCoords.y, 5, 5)
        this.ctx.fillText(`(${Math.round(camCoords.x)}, ${Math.round(camCoords.y)})`, camCoords.x, camCoords.y)
    }
    mousePosTextScreenCoords = (x, y) => {
        const worldCoords = this.cam.worldToScreen(x, y)
        const camCoords = this.cam.screenToWorld(x, y)
        this.ctx.fillRect(camCoords.x, camCoords.y, 5, 5)
        this.ctx.fillText(`(${Math.round(worldCoords.x)}, ${Math.round(worldCoords.y)})`, camCoords.x, camCoords.y)
    }
    showScreenDim = (colorWorldToScreen = "green", colorScreenToWorld = "blue") => {
        const prevFillStyle = this.ctx.fillStyle
        // const worldToScreenCoords = {
        //     p1: { x: this.cam.worldToScreen(0, 0).x, y: this.cam.worldToScreen(0, 0).y }
        // }
        const screenToWorldCoords = {
            p1: { x: this.cam.screenToWorld(0, 0).x, y: this.cam.screenToWorld(0, 0).y },
            p2: { x: this.cam.screenToWorld(0, this.ctx.canvas.height - 10).x, y: this.cam.screenToWorld(0, this.ctx.canvas.height - 10).y },
            p3: { x: this.cam.screenToWorld(this.ctx.canvas.width - 10, this.ctx.canvas.height - 10).x, y: this.cam.screenToWorld(this.ctx.canvas.width - 10, this.ctx.canvas.height - 10).y }
        }
        // this.ctx.fillStyle = colorWorldToScreen
        // this.ctx.fillRect(worldToScreenCoords.p1.x, worldToScreenCoords.p1.y, 10, 10)
        this.ctx.fillStyle = colorScreenToWorld
        this.ctx.fillRect(screenToWorldCoords.p1.x, screenToWorldCoords.p1.y, 10, 10)
        this.ctx.fillRect(screenToWorldCoords.p2.x, screenToWorldCoords.p2.y, 10, 10)
        this.ctx.fillRect(screenToWorldCoords.p3.x, screenToWorldCoords.p3.y, 10, 10)

        this.ctx.fillStyle = prevFillStyle
        // console.log(this.cam.getDimensions_screenToWorld())
    }
    showMessage = (str = "") => {
        this.message = str
        const worldCoords = this.cam.screenToWorld(50, 50)
        this.ctx.fillText(this.message, worldCoords.x, worldCoords.y)
    }
    showFPS = (fps = 0) => {
        const worldCoords = this.cam.screenToWorld(0, 10)
        this.ctx.fillText("[FPS]" + fps, worldCoords.x, worldCoords.y)
    }
    drawLine = (from = { x: 0, y: 0 }, to = { x: 0, y: 0 }, color = "green") => {
        const oldStrokeStyle = this.ctx.strokeStyle
        this.ctx.strokeStyle = color
        this.ctx.beginPath()
        this.ctx.moveTo(from.x, from.y)
        this.ctx.lineTo(to.x, to.y)
        this.ctx.stroke()
        this.ctx.strokeStyle = oldStrokeStyle
    }
    drawLineRelative = (from = { x: 0, y: 0 }, to = { x: 0, y: 0 }, color = "green") => {
        const oldStrokeStyle = this.ctx.strokeStyle
        this.ctx.strokeStyle = color
        this.ctx.beginPath()
        this.ctx.moveTo(from.x, from.y)
        this.ctx.lineTo(from.x + to.x, from.y + to.y)
        this.ctx.stroke()
        this.ctx.strokeStyle = oldStrokeStyle
    }
    logOnce = (msg = "") => {
        if (this.debuggedOnce) return
        console.log(msg)
        this.debuggedOnce = true
    }
    resetLogOnce = () => {
        this.debuggedOnce = false
    }
    drawLine = (fromVec = { x: 0, y: 0 }, toVec = { x: 0, y: 0 }, color = "green") => {
        const prevStrokeStyle = this.ctx.strokeStyle
        this.ctx.beginPath()
        this.ctx.moveTo(fromVec.x, fromVec.y)
        this.ctx.lineTo(fromVec.x + toVec.x, fromVec.y + toVec.y)
        this.ctx.strokeStyle = color
        this.ctx.stroke()
        this.ctx.strokeStyle = prevStrokeStyle
    }
    
    drawLineDirect = (fromVec = { x: 0, y: 0 }, toVec = { x: 0, y: 0 }, color = "green") => {
        const prevStrokeStyle = this.ctx.strokeStyle
        this.ctx.beginPath()
        this.ctx.moveTo(fromVec.x, fromVec.y)
        this.ctx.lineTo(toVec.x, toVec.y)
        this.ctx.strokeStyle = color
        this.ctx.stroke()
        this.ctx.strokeStyle = prevStrokeStyle
    }
    
    drawLineCentered = (fromVec = { x: 0, y: 0 }, toVec = { x: 0, y: 0 }, color = "green") => {
        const prevStrokeStyle = this.ctx.strokeStyle
        this.ctx.beginPath()
        this.ctx.moveTo(this.center.x + fromVec.x, this.center.y + fromVec.y)
        this.ctx.lineTo(this.center.x + toVec.x, this.center.y + toVec.y)
        this.ctx.strokeStyle = color
        this.ctx.stroke()
        this.ctx.strokeStyle = prevStrokeStyle
    }
}