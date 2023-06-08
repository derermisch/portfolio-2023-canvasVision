import { useEffect, useRef } from "react"
import { getCurrentLightMode } from "../../utils/darkmode"
import { addVector, getAngleBetweenVectors, normalizeVector, radToDeg, rotateVector, rotateVectorNormalizedAnchored, scaleVector, subVector } from "../../ballsy/utils"
import html2canvas from "html2canvas"

export default function CanvasBackground() {
    const myCanvas = useRef(null)

    // Mouse effect
    useEffect(() => {
        if (!myCanvas.current) return
        console.log(document.readyState)

        /** @type{HTMLCanvasElement} */
        let canvas = myCanvas.current
        let ctx = canvas.getContext("2d")

        // Canvas settings
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Context settings
        let currentLightMode = getCurrentLightMode()
        const returnGoalColor = (lightMode) => "#EF6461"
        // const returnGoalColor = (lightMode) => lightMode === "light" ? "#404040" : "#F8F7FF"
        ctx.fillStyle = returnGoalColor(currentLightMode)
        ctx.strokeStyle = returnGoalColor(currentLightMode)
        ctx.lineWidth = 1

        let batchCount = 0
        let frameId = null
        let mousePos = false

        // Helper functions
        function throttle(cb, delay = 250) {
            let shouldWait = false

            return (...args) => {
                if (shouldWait) return

                cb(...args)
                shouldWait = true
                setTimeout(() => {
                    shouldWait = false
                }, delay)
            }
        }
        function hexToRGBA(hexColor, alpha) {
            // Remove '#' symbol if present
            hexColor = hexColor.replace('#', '');

            // Convert to RGB values
            const r = parseInt(hexColor.substring(0, 2), 16);
            const g = parseInt(hexColor.substring(2, 4), 16);
            const b = parseInt(hexColor.substring(4, 6), 16);

            // Calculate the alpha value (default to 1 if not provided)
            const a = alpha !== undefined ? alpha : 1;

            // Return RGBA object
            return {
                r: r,
                g: g,
                b: b,
                a: a
            };
        }

        // Class declarations
        class MouseParticle {
            constructor(effect, originPoint, batchNumber) {
                this.effect = effect
                this.originPoint = originPoint
                this.goalPoint = false
                this.lineStrength = ctx.lineWidth
            }
            draw(context) {
                if (this.goalPoint) {
                    ctx.lineWidth = this.lineStrength
                    context.beginPath()
                    context.moveTo(this.originPoint.x, this.originPoint.y)
                    context.lineTo(this.goalPoint.x, this.goalPoint.y)
                    context.stroke()
                }
                // context.fillRect(this.originPoint.x, this.originPoint.y, 3, 3)
            }
        }

        class MouseEffect {
            constructor(canvas) {
                this.canvas = canvas
                this.width = this.canvas.width
                this.height = this.canvas.height
                this.particles = []
                this.trailLenght = 10
                this.maxRadius = 25
                this.batchConnectivityRange = 5
                this.trailPoints = 5
                this.mouseRadius = 5
                this.mouseMovement = []
                this.circleAnchor
            }
            recordMousePositions = () => {
                if (!mousePos) return
                // First step: get movement vector of mouse
                if (this.mouseMovement.length < 5) {
                    this.mouseMovement.push(mousePos)
                } else {
                    this.mouseMovement.shift()
                    this.mouseMovement.push(mousePos)
                }
                if (this.mouseMovement.length < 2) return
                const dirVec = scaleVector(normalizeVector(subVector(this.mouseMovement[this.mouseMovement.length - 1], this.mouseMovement[0])), this.mouseRadius)
                this.circleAnchor = {
                    x: mousePos.x - dirVec.x,
                    y: mousePos.y - dirVec.y
                }

                // go from -90 deg to 90 deg
                const step = 180 / (this.trailPoints - 1)
                const startAngle = -90
                for (let i = 0; i < this.trailPoints; i++) {
                    let rotatedVec = rotateVector(dirVec, startAngle + step * i)
                    let finalVec = {
                        x: mousePos.x - rotatedVec.x,
                        y: mousePos.y - rotatedVec.y
                    }
                    // this.particles.push(new Particle(ctx, { x: x, y: (y - this.mouseRadius) + step * i }, batchCount))
                    if (this.particles.length < this.trailLenght * this.trailPoints) {
                        this.particles.push(new MouseParticle(ctx, finalVec, batchCount))
                    }
                    else {
                        this.particles.shift()
                        this.particles.push(new MouseParticle(ctx, finalVec, batchCount))
                    }
                }
                batchCount++

            }
            drawFollowingLines = () => {
                if (!mousePos) return
                for (let i = this.particles.length - 1; i >= this.trailPoints; i--) {
                    this.particles[i].goalPoint = this.particles[i - this.trailPoints].originPoint
                    const lineProgress = (i) / (this.particles.length - 1)
                    this.particles[i].lineStrength = ctx.lineWidth * lineProgress
                }
                this.particles.forEach(particle => {
                    setTimeout(() => {
                        this.removeParticle(particle);
                    }, 100);
                })
            }
            drawCircleAtMousePos = (context) => {
                if (!mousePos) return
                context.beginPath()
                context.arc(mousePos.x, mousePos.y, this.mouseRadius, 0, 2 * Math.PI);
                context.stroke()
                context.fill()
            }
            removeParticle = (ref) => {
                const index = this.particles.indexOf(ref);
                if (index !== -1) {
                    this.particles.splice(index, 1);
                }
            }
            getPointAlongCircle = (mousePos, radius, angle) => {
                return {
                    x: mousePos.x + Math.random() * (radius + 1) * Math.cos(angle),
                    y: mousePos.y + Math.random() * (radius + 1) * Math.sin(angle)
                }
            }
            resize(width, height) {
                canvas.width = width
                canvas.height = height
                this.canvas.height = height
                this.canvas.width = width
                this.width = this.canvas.width
                this.height = this.canvas.height
                this.particles = []
            }
            render(context) {
                if (mousePos) {
                    this.drawCircleAtMousePos(context)
                }
                this.particles.forEach(particle => {
                    particle.draw(context)
                    // particle.update()
                })
            }
        }

        class ImgParticle {
            constructor(x, y) {
                this.x = x
                this.y = y
            }
            draw(context) {
                context.fillRect(this.x, this.y, 10, 10)
            }
        }

        class ImgEffect {
            constructor() {
                this.gapStep = 4
                this.particles = []
                this.init()
            }
            async init() {
                const capturedCanvas = await html2canvas(document.body)
                const capturedCanvasCtx = capturedCanvas.getContext("2d")
                const imgData = capturedCanvasCtx.getImageData(0, 0, capturedCanvas.width, capturedCanvas.height).data

                const filterRgb = hexToRGBA("f8f7ff")

                for (let y = 0; y < capturedCanvas.height; y += this.gapStep) {
                    for (let x = 0; x < capturedCanvas.width; x += this.gapStep) {
                        const index = (y * capturedCanvas.width + x) * 4
                        const red = imgData[index]
                        const green = imgData[index + 1]
                        const blue = imgData[index + 2]
                        const alpha = imgData[index + 3]

                        if (red === filterRgb.r && green === filterRgb.g && blue === filterRgb.b) {
                            continue
                        }
                        this.particles.push(new ImgParticle(x, y))
                    }
                }
            }
            render(context) {
                this.particles.forEach(particle => {
                    particle.draw(context)
                    // particle.update()
                })
            }
        }

        const effect_mouse = new MouseEffect(canvas)
        let effect_img = new ImgEffect()
        const startRender = () => {
            if (frameId) cancelAnimationFrame(frameId)

            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                effect_mouse.render(ctx)
                effect_img.render(ctx)
                frameId = requestAnimationFrame(animate)
            }
            animate()
        }
        startRender()

        const resizeEvent = (e) => {
            effect_mouse.resize(e.target.innerWidth, e.target.innerHeight)
            changeCtxColors()
        }

        const mouseMoveEventAlways = (e) => {
            mousePos = { x: e.clientX + effect_mouse.mouseRadius / 2, y: e.clientY }
        }

        const mouseMoveEventThrottled = throttle((e) => {
            effect_mouse.recordMousePositions()
            effect_mouse.drawFollowingLines()
        }, 10)

        const mouseOutEvent = () => {
            mousePos = false
        }

        const changeCtxColors = () => {
            currentLightMode = getCurrentLightMode()
            ctx.strokeStyle = returnGoalColor(currentLightMode)
            ctx.fillStyle = returnGoalColor(currentLightMode)
        }

        const dataFetchedEvent = () => {
            console.log("data fetcheed")
            effect_img = new ImgEffect()
        }

        window.addEventListener("resize", resizeEvent)
        window.addEventListener("mousemove", mouseMoveEventAlways)
        window.addEventListener("mousemove", mouseMoveEventThrottled)
        window.addEventListener("mouseout", mouseOutEvent)
        window.addEventListener("notifyLightMode", changeCtxColors)
        window.addEventListener("dataFetched", dataFetchedEvent)

        return () => {
            cancelAnimationFrame(frameId)
            window.removeEventListener("resize", resizeEvent)
            window.removeEventListener("mousemove", mouseMoveEventAlways)
            window.removeEventListener("mousemove", mouseMoveEventThrottled)
            window.removeEventListener("mouseout", mouseOutEvent)
            window.removeEventListener("notifyLightMode", changeCtxColors)
            window.removeEventListener("dataFetched", dataFetchedEvent)
        }
    }, [myCanvas])

    return <canvas className="backgroundCanvas" ref={myCanvas}></canvas>

}