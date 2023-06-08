/** @type{CanvasRenderingContext2D} */
let ctx
let cam

export const initUi = (_ctx, _cam) => {
    ctx = _ctx
    cam = _cam
}

export const fillTextAt = (str = "",font = "50px Verdana") => {
    const prevFont = ctx.font
    ctx.font = font
    const textMeasure = ctx.measureText(str)
    const goalVec = cam.screenToWorld(ctx.canvas.width - textMeasure.width,
        (textMeasure.fontBoundingBoxAscent - textMeasure.fontBoundingBoxDescent))
    ctx.fillText(str, goalVec.x, goalVec.y)
    ctx.font = prevFont
}