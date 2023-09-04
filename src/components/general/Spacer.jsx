import { useEffect, useRef } from "react"
import { ClipLoader } from "react-spinners"
import sanityClient from "../../client"
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
    return builder.image(source)
}

// svg-code from https://app.haikei.app/. Dimensions: 1000 x 100
export default function Spacer({ spacerBg, showLower = true }) {
    const containerRef = useRef(null)

    useEffect(() => {
        (async () => {
            if (!containerRef.current || !spacerBg) return
            const spacer = containerRef.current
            spacer.style.backgroundImage = `url(${urlFor(spacerBg.spacerImg.imgUrl).url()})`
        })();
    }, [spacerBg, containerRef])

    return spacerBg ?
        <div className="spacer" ref={containerRef}>
            <div />
            <p className="spacer--warpText">### Hyperspace Warp ###</p>
            <div />
        </div>
        : <ClipLoader
            className="clipLoader" />
}