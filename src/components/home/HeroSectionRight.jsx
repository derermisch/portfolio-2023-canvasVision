import { useEffect, useRef } from "react"
import { ClipLoader } from "react-spinners"
import client from "../../client"
import imageUrlBuilder from "@sanity/image-url"

export default function HeroSectionRight({ heroRight, lan }) {
    const canvasRef = useRef(null)

    const builder = imageUrlBuilder(client)

    useEffect(() => {
        if (!canvasRef.current) return
        if (!heroRight) return

        /** @type{HTMLCanvasElement} */
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        ctx.globalCompositeOperation = "source-over"

        canvas.width = canvas.getBoundingClientRect().width
        canvas.height = canvas.getBoundingClientRect().height

        const canvasRect = canvas.getBoundingClientRect()
        const canvasOffsetX = canvasRect.left
        const canvasOffsetY = canvasRect.top

        let frameId = null

        let myImage = new Image()
        myImage.crossOrigin = 'Anonymous';
        // myImage.src = builder.image(heroRight.imgUrl).width(canvas.width).height(canvas.height)
        myImage.src = "src/assets/me1.jpg"
        // myImage.width = myImage.naturalWidth
        // myImage.height = myImage.naturalHeight
        // Calculate the aspect ratio of the image and the canvas
        var imageAspectRatio = myImage.width / myImage.height;
        var canvasAspectRatio = canvas.width / canvas.height;

        // Calculate the new dimensions while preserving the aspect ratio
        var newWidth, newHeight;
        if (imageAspectRatio > canvasAspectRatio) {
            newWidth = canvas.width;
            newHeight = canvas.width / imageAspectRatio;
        } else {
            newWidth = canvas.height * imageAspectRatio;
            newHeight = canvas.height;
        }

        // Calculate the position to center and crop the image on the canvas
        var x = (canvas.width - newWidth) / 2;
        var y = (canvas.height - newHeight) / 2;

        const gradient = ctx.createLinearGradient(canvas.width / 2, 0, canvas.width / 2, canvas.height)
        gradient.addColorStop(0, "#ED33B9")
        gradient.addColorStop(1, "#F9E900")

        myImage.addEventListener("load", function () {
            ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height)
            const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const particlesArray = []
            const numberOfParticles = 7000

            // let switcher = 1
            // let counter = 0
            // setInterval(function () {
            //     counter++
            //     // if (counter % 3 === 0){
            //     //     switcher *= -1
            //     // }
            //     switcher *= -1
            // }, 2000)

            const mappedImage = []
            for (let y = 0; y < canvas.height; y++) {
                const row = []
                for (let x = 0; x < canvas.width; x++) {
                    const index = (y * canvas.width + x) * 4
                    const red = pixels[index]
                    const green = pixels[index + 1]
                    const blue = pixels[index + 2]
                    let cellBrightness = calculateRelativeBrightness(red, green, blue)
                    // if (calculateColorCloseness(red, green, blue, 120, 165, 163) > 0.9) {
                    //     brightness = 0.1
                    // }
                    let cellColor = `rgb(${red},${green},${blue})`
                    const cell = [
                        cellBrightness,
                        cellColor
                    ]
                    row.push(cell)
                }
                mappedImage.push(row)
            }

            // function calculateRelativeBrightness(red, green, blue) {
            //     return (Math.sqrt(
            //         (red * red) * 0.299 +
            //         (green * green) * 0.587 +
            //         (blue * blue) * 0.114
            //     ) / 100)
            // }

            function calculateRelativeBrightness(red, green, blue) {
                // Adjust RGB values for gamma correction
                const gammaCorrectedRed = red / 255;
                const gammaCorrectedGreen = green / 255;
                const gammaCorrectedBlue = blue / 255;

                // Calculate relative brightness using the formula
                const relativeBrightness = Math.sqrt(
                    0.299 * Math.pow(gammaCorrectedRed, 2) +
                    0.587 * Math.pow(gammaCorrectedGreen, 2) +
                    0.114 * Math.pow(gammaCorrectedBlue, 2)
                );

                // Invert brightness value and return
                return relativeBrightness + 0.5;
            }

            function getRGBFromHex(colorHex) {
                // Remove the '#' symbol if present
                const hex = colorHex.startsWith('#') ? colorHex.slice(1) : colorHex;

                // Extract red, green, and blue components
                const red = parseInt(hex.substring(0, 2), 16);
                const green = parseInt(hex.substring(2, 4), 16);
                const blue = parseInt(hex.substring(4, 6), 16);

                return { red, green, blue };
            }

            function calculateColorCloseness(red, green, blue, targetRed, targetGreen, targetBlue) {
                // Calculate color difference using Euclidean distance formula
                const colorDifference = Math.sqrt(
                    Math.pow(red - targetRed, 2) +
                    Math.pow(green - targetGreen, 2) +
                    Math.pow(blue - targetBlue, 2)
                );

                // Calculate maximum color difference based on target color
                const maxColorDifference = Math.sqrt(
                    Math.pow(targetRed, 2) +
                    Math.pow(targetGreen, 2) +
                    Math.pow(targetBlue, 2)
                );

                // Calculate closeness ratio
                const closenessRatio = 1 - colorDifference / maxColorDifference;

                // Clamp closeness ratio between 0 and 1
                const clampedClosenessRatio = Math.max(0, Math.min(1, closenessRatio));

                return clampedClosenessRatio;
            }

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width
                    this.y = Math.random() * canvas.height
                    this.speed = 0
                    this.velocity = Math.random() * 2.5
                    this.size = Math.random() * 2.5 + 0.2
                    this.position1 = Math.floor(this.y)
                    this.position2 = Math.floor(this.x)
                    this.angle = 0
                }
                update() {
                    this.position1 = Math.floor(this.y)
                    this.position2 = Math.floor(this.x)
                    if ((mappedImage[this.position1]) && (mappedImage[this.position1][this.position2])) {
                        this.speed = mappedImage[this.position1][this.position2][0]
                        // currently, particles move faster in light areas
                    }
                    let movement = (2.5 - this.speed) + this.velocity
                    this.angle += this.speed / 30
                    // this.size = this.speed * (Math.random() * 2 + 1)
                    this.size = this.speed * 1.5
                    // ctx.globalCompositeOperation = "hard-light"

                    // if (switcher === 1){
                    //     ctx.globalCompositeOperation = "lighter"
                    // } else {
                    //     ctx.globalCompositeOperation = "source-over"
                    // }

                    this.y += movement + Math.sin(this.angle) * .5
                    this.x += 2 // to mouse position?
                    if (this.y >= canvas.height) {
                        this.y = 0
                        this.x = Math.random() * canvas.width
                    }
                    if (this.x >= canvas.width) {
                        this.x = 0
                        this.y = Math.random() * canvas.height
                    }
                }
                draw() {
                    ctx.beginPath()
                    if ((mappedImage[this.position1]) && (mappedImage[this.position1][this.position2])) {
                        ctx.fillStyle = mappedImage[this.position1][this.position2][1]
                    }

                    // ctx.fillStyle = gradient
                    // if (this.speed <= 0.1) {
                    //     ctx.fillRect(this.x, this.y, this.size * 40, this.size * 40)
                    // } else {
                    //     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                    // }
                    if (this.speed >= 1.2) {
                        // ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2)
                        ctx.fillRect(this.x, this.y, this.size * 3, this.size * 3)
                    } else {
                        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                    }
                    ctx.fill()
                }
            }

            function init() {
                for (let i = 0; i < numberOfParticles; i++) {
                    particlesArray.push(new Particle())
                }
            }
            init()

            function animate() {
                ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height)
                // ctx.globalAlpha = 0.05
                // ctx.fillStyle = `black`
                // ctx.fillRect(0, 0, canvas.width, canvas.height)
                // ctx.globalAlpha = 0.2
                // for (let i = 0; i < particlesArray.length; i++) {
                //     particlesArray[i].update()
                //     ctx.globalAlpha = particlesArray[i].speed * 0.5
                //     ctx.globalAlpha = 1
                //     particlesArray[i].draw()
                // }
                // frameId = requestAnimationFrame(animate)
            }
            animate()
        })

        // const onMouseMove = (e) => {
        //     mousePos.active = true
        //     mousePos.x = e.clientX - canvasOffsetX
        //     mousePos.y = e.clientY - canvasOffsetY
        // }

        // window.addEventListener("mousemove", onMouseMove)

        return () => {
            cancelAnimationFrame(frameId)
            // window.removeEventListener("mousemove", onMouseMove)
        }
    }, [canvasRef, heroRight])

    return heroRight ? (
        // <div className="home--heroSection--right">
        //     {/* <canvas className="home--heroSection--right--canvas" ref={canvasRef}></canvas> */}
        // </div>
        <div className="home--heroSection--right">
            {/* <img className="home--heroSection--right--img" src={builder.image(heroRight.imgUrl).width(800).height(800)} alt="Myself"/> */}
            <div className="home--heroSection--right--img" style={{ backgroundImage: `url(${builder.image(heroRight.imgUrl).width(800).height(800)})` }} alt="Myself" />
            {/* <img className="home--heroSection--right--img" src={builder.image(heroRight.imgUrl).width(800).height(800)} alt="myself" /> */}
        </div>
    ) : (
        <ClipLoader
            className="clipLoader" />
    )
}
