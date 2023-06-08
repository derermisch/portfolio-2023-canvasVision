import { useEffect, useRef } from "react"
import { ClipLoader } from "react-spinners"
import { getCurrentLightMode } from "../../utils/darkmode"

// svg-code from https://app.haikei.app/. Dimensions: 1000 x 100
export default function Spacer({ spacerRes, pageMult = 1 }) {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return
        if (!spacerRes) return

        /** @type{HTMLElement} */
        const container = containerRef.current
        const lowerSpacer = container.lastChild
        let spacerCode = spacerRes.spacerSvgCode

        const adjustSpacerCodeBasedOnLightMode = () => {
            let newColor = "#22222"
            getCurrentLightMode() === "dark" ? newColor = "#EFE9E7" : newColor = "#272727"
            spacerCode = spacerCode.replace(/fill*=["'][^"']*["']/i, `fill="${newColor}"`);
        }
        adjustSpacerCodeBasedOnLightMode()

        const setUpSpacer = () => {
            const svg64 = window.btoa(spacerCode)
            container.childNodes.forEach(child => {
                child.style.backgroundImage = `url('data:image/svg+xml;base64,${svg64}')`
                child.style.width = document.documentElement.clientWidth + "px"
            })
            lowerSpacer.style.rotate = "180deg"
            container.style.top = `calc(${pageMult * 100}vh - ${container.getBoundingClientRect().height / 2}px)`

        }
        setUpSpacer()

        const onLightModeChange = () => {
            adjustSpacerCodeBasedOnLightMode()
            setUpSpacer()
        }

        window.addEventListener("resize", setUpSpacer)
        window.addEventListener("notifyLightMode", onLightModeChange)

        return () => {
            window.removeEventListener("resize", setUpSpacer)
            window.removeEventListener("notifyLightMode", onLightModeChange)
        }
    }, [containerRef, spacerRes, pageMult])

    return spacerRes ?
        <div className="spacer" ref={containerRef}>
            <div className="spacer--upper"></div>
            <div className="spacer--lower"></div>
        </div>
        : <ClipLoader />
}