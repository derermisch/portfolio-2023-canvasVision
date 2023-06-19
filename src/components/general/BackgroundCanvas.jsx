import { useEffect, useRef, useCallback } from "react"
import { throttle } from "../../utils/utils"
import { useInView } from "react-intersection-observer"
import { createNoise2D } from "simplex-noise"
import alea from "alea"

export default function BackgroundCanvas({ shape = "normal", curve = 1, zoom = 1, targetElementClassName = null }) {
    const canvasRef = useRef(null)
    const { ref: inViewRef, inView } = useInView()

    const setRefs = useCallback((node) => {
        canvasRef.current = node
        inViewRef(node)
    }, [inViewRef])

    useEffect(() => {
        if (!canvasRef.current) return
        if (!targetElementClassName) return
        if (!inView) return

        let frameId = null
        let lastTime = 0

        let myTarget = document.querySelector(targetElementClassName)
        let myTargetRect = myTarget.getBoundingClientRect()

        /** @type{HTMLCanvasElement} */
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        canvas.width = document.body.clientWidth
        canvas.height = myTargetRect.height
        canvas.style.top = myTargetRect.top + Number(scrollY) + "px"

        ctx.lineWidth = .6
        ctx.fillStyle = "white"
        ctx.strokeStyle = "red"

        function getRandomNumber(x, y) {
            // return Math.floor(Math.random() * (y - x + 1)) + x;
            return Math.random() * (y - x + 1) + x;
        }

        // Class declarations
        class Particle {
            constructor(effect) {
                this.effect = effect
                this.x = Math.floor(Math.random() * canvas.width)
                this.y = Math.floor(Math.random() * canvas.height)
                this.speedX
                this.speedY
                this.initialSpeedBost = true
                this.speedModifer = Math.floor(Math.random() * 5 + 1) * 50
                this.history = [{ x: this.x, y: this.y }]
                this.maxLength = Math.floor(Math.random() * 200 + 10)
                this.angle = 0
                this.timer = this.maxLength * 2
                // this.colors = ["#4c026b", "#730d9e", "red"]
                // this.colors = ["#478978", "#709176"]
                this.colors = ["#ED33B9", "#F9E900"]
                // https://coolors.co/272727-efe9e7-2b50aa-f9e900-ed33b9
                this.color = this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            draw() {
                ctx.beginPath()
                ctx.moveTo(this.history[0].x, this.history[0].y)
                for (let i = 0; i < this.history.length; i++) {
                    ctx.lineTo(this.history[i].x, this.history[i].y)
                }
                ctx.strokeStyle = this.color
                ctx.stroke()
            }
            update(dt) {
                this.timer--
                if (this.timer >= 1) {
                    // Assign cell to flow field
                    let x = Math.floor(this.x / this.effect.cellSize)
                    let y = Math.floor(this.y / this.effect.cellSize)
                    let index = y * this.effect.cols + x //2d to 1d array projection
                    this.angle = this.effect.flowField[index]

                    // Movement
                    this.speedX = Math.cos(this.angle)
                    this.speedY = Math.sin(this.angle)

                    // This is used to initially render framerate independent, so the effect is cleary visible from the start 
                    if (this.initialSpeedBost) {
                        this.x += this.speedX * Math.floor(Math.random() * 5 + 1)
                        this.y += this.speedY * Math.floor(Math.random() * 5 + 1)
                        setTimeout(() => {
                            this.initialSpeedBost = false
                        }, 400)
                    } else {
                        this.x += this.speedX * this.speedModifer * dt
                        this.y += this.speedY * this.speedModifer * dt
                    }

                    // Trail
                    this.history.push({ x: this.x, y: this.y })
                    if (this.history.length > this.maxLength) {
                        this.history.shift()
                    }
                } else if (this.history.length > 1) {
                    this.history.shift()
                } else {
                    this.reset()
                }
            }
            reset() {
                this.x = Math.floor(Math.random() * canvas.width)
                this.y = Math.floor(Math.random() * canvas.height)
                this.history = [{ x: this.x, y: this.y }]
                this.timer = this.maxLength * 2
            }
        }
        class Effect {
            constructor() {
                this.particles = []
                this.numberOfParicles = 500
                this.cellSize = 10
                this.rows
                this.cols
                this.flowField = []
                this.curve = curve
                this.zoom = zoom
                this.debug = false
                this.init()
            }
            init() {
                // Create flow field
                this.rows = Math.floor(canvas.height / this.cellSize)
                this.cols = Math.floor(canvas.width / this.cellSize)
                this.flowField = []
                // const prng = alea("seed")
                // const noise2D = createNoise2D(prng)
                for (let y = 0; y < this.rows; y++) {
                    for (let x = 0; x < this.cols; x++) {
                        // let angle = shapeProvider(x, y, shapeFunction_exp, this.zoom, this.curve)
                        let angle = this.getAngle(x, y, shape)
                        // let angle = noise2D(x / 100, y / 100)
                        this.flowField.push(angle)
                    }
                }

                // Create particles
                this.particles = []
                for (let i = 0; i < this.numberOfParicles; i++) {
                    this.particles.push(new Particle(this))
                }
                this.particles.push(new Particle(this))
            }
            getAngle = (x, y, config = "normal") => {
                let angle = Math.cos(x * this.zoom) + (Math.sin(y * this.zoom)) * this.curve
                switch (config) {
                    case "90deg_up":
                        angle = ((Math.cos(x * this.zoom) + Math.cos(Math.PI / 1)) + (Math.sin(y * this.zoom) + Math.sin(Math.PI / 1))) * this.curve
                    case "90deg_down":
                        angle = ((Math.cos(x * this.zoom) + Math.cos(Math.PI / 10)) + (Math.sin(y * this.zoom) + Math.sin(Math.PI / 1))) * this.curve
                }
                return angle
            }
            resize() {
                const tmp = document.querySelector(targetElementClassName)
                const tmpRect = tmp.getBoundingClientRect()
                if (myTargetRect.top !== tmpRect.top) {
                    // targetElementClassName === ".services" && console.log("Top difference at " + targetElementClassName)
                    canvas.style.top = tmpRect.top + Number(scrollY) + "px"
                }
                if (myTargetRect.height !== tmpRect.height) {
                    // targetElementClassName === ".services" && console.log("Height difference at " + targetElementClassName)
                    canvas.height = tmpRect.height
                    this.init()
                }
                if (myTargetRect.width !== tmpRect.width) {
                    // targetElementClassName === ".services" && console.log("Width difference at " + targetElementClassName)
                    canvas.width = document.body.clientWidth
                    this.init()

                }
                myTarget = tmp
                myTargetRect = tmpRect
            }
            render(dt) {
                this.particles.forEach(particle => {
                    particle.draw()
                    particle.update(dt)
                })
            }
        }

        // Code execution
        const effect = new Effect()

        const animate = (timestamp) => {
            const dt = (timestamp - lastTime) / 1000
            lastTime = timestamp

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            effect.render(dt)
            frameId = requestAnimationFrame(animate)
        }
        animate()

        const onResizeEvent = (e) => {
            cancelAnimationFrame(frameId)
            // console.log("client width", document.body.clientWidth, "inner width", window.innerWidth)
            effect.resize()
            animate()
        }

        window.addEventListener("customResize", onResizeEvent)
        window.addEventListener("dataFetched", onResizeEvent)

        return () => {
            // console.log(`Cancel frame ${frameId} at ${targetElementClassName}`)
            cancelAnimationFrame(frameId)
            canvas.width = 0
            canvas.height = 0
            window.removeEventListener("customResize", onResizeEvent)
            window.removeEventListener("dataFetched", onResizeEvent)
        }

    }, [setRefs, shape, curve, zoom, targetElementClassName, inView])

    return (
        <canvas className="backgroundCanvas" ref={setRefs}></canvas>
    )
}