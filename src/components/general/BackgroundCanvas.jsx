import { useEffect, useRef } from "react"

export default function BackgroundCanvas({ pageMult = 1, shape = "normal", heightMult = 1, widthMult = 1, curve = 1, zoom = 1 , targetElement = null}) {
    const canvasRef = useRef(null)

    useEffect(() => {
        if (!canvasRef.current) return

        /** @type{HTMLCanvasElement} */
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        canvas.width = document.body.clientWidth * widthMult
        canvas.height = window.innerHeight * heightMult

        canvas.style.top = `${100 * pageMult - 100}vh`
        if (targetElement){
            canvas.style.top = targetElement.getBoundingClientRect().top + scrollY + "px"
            canvas.height = targetElement.getBoundingClientRect().height
        }

        ctx.lineWidth = .6
        ctx.fillStyle = "white"
        ctx.strokeStyle = "red"

        function getRandomNumber(x, y) {
            // return Math.floor(Math.random() * (y - x + 1)) + x;
            return Math.random() * (y - x + 1) + x;
        }

        let frameId = null

        // Class declarations
        class Particle {
            constructor(effect) {
                this.effect = effect
                this.x = Math.floor(Math.random() * canvas.width)
                this.y = Math.floor(Math.random() * canvas.height)
                this.speedX
                this.speedY
                this.speedModifer = Math.floor(Math.random() * 5 + 1)
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
            update() {
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
                    this.x += this.speedX * this.speedModifer
                    this.y += this.speedY * this.speedModifer

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
                this.cellSize = 20
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
                for (let y = 0; y < this.rows; y++) {
                    for (let x = 0; x < this.cols; x++) {
                        // let angle = shapeProvider(x, y, shapeFunction_exp, this.zoom, this.curve)
                        let angle = this.getAngle(x, y, shape)
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
                // canvas.width = window.innerWidth * widthMult
                // canvas.height = window.innerHeight * heightMult
                canvas.width = document.body.clientWidth * widthMult
                canvas.height = window.innerHeight * heightMult
                canvas.style.top = `${100 * pageMult - 100}vh`
                if (targetElement){
                    canvas.style.top = targetElement.getBoundingClientRect().top + scrollY + "px"
                    canvas.height = targetElement.getBoundingClientRect().height
                }
                this.init()
            }
            render() {
                this.particles.forEach(particle => {
                    particle.draw()
                    particle.update()
                })
            }
        }

        // Code execution
        const effect = new Effect()

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            effect.render()
            frameId = requestAnimationFrame(animate)
        }
        animate()

        const onResizeEvent = (e) => {
            // console.log("resize")
            cancelAnimationFrame(frameId)
            // console.log("client width", document.body.clientWidth, "inner width", window.innerWidth)
            effect.resize()
            animate()
        }

        window.addEventListener("customResize", onResizeEvent)

        return () => {
            cancelAnimationFrame(frameId)
            window.removeEventListener("customResize", onResizeEvent)
        }

    }, [canvasRef, pageMult, shape, heightMult, widthMult, curve, zoom, targetElement])

    return (
        <canvas className="backgroundCanvas" ref={canvasRef}></canvas>
    )
}