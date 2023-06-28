import { useEffect, useRef } from "react"
import { ClipLoader } from "react-spinners"

import { getCurrentLightMode } from "../../utils/darkmode"

// svg-code from https://app.haikei.app/. Dimensions: 1000 x 100
export default function Spacer({ spacerRes, targetElementClassName = null, showLower = true }) {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return
        if (!spacerRes) return
        if (!targetElementClassName) return

        let myTargetRect = document.querySelector(targetElementClassName).getBoundingClientRect()

        /** @type{HTMLElement} */
        const container = containerRef.current
        const lowerSpacer = container.lastChild
        let spacerCode = spacerRes.spacerSvgCode
        let initialSetup = true

        const adjustSpacerCodeBasedOnLightMode = () => {
            let newColor = "#22222"
            getCurrentLightMode() === "dark" ? newColor = "#EFE9E7" : newColor = "#272727"
            spacerCode = spacerCode.replace(/fill*=["'][^"']*["']/i, `fill="${newColor}"`);
        }
        adjustSpacerCodeBasedOnLightMode()

        const setup = () => {
            if (!initialSetup) {
                const tmpRect = document.querySelector(targetElementClassName).getBoundingClientRect()
                if (tmpRect.width === myTargetRect.width && tmpRect.height === myTargetRect.height) {
                    return
                }
                myTargetRect = document.querySelector(targetElementClassName).getBoundingClientRect()
            }
            else {
                myTargetRect = document.querySelector(targetElementClassName).getBoundingClientRect()
                initialSetup = false
            }
            // console.log("setup")
            const svg64 = window.btoa(spacerCode)
            container.childNodes.forEach(child => {
                child.style.backgroundImage = `url('data:image/svg+xml;base64,${svg64}')`
                child.style.width = document.body.clientWidth + "px"
            })
            lowerSpacer.style.rotate = "180deg"
            if (!showLower) {
                lowerSpacer.style.display = "none"
                container.style.top = myTargetRect.height + myTargetRect.top + Number(scrollY) + "px"
            }
            else {
                container.style.top = myTargetRect.height + myTargetRect.top + Number(scrollY) - container.getBoundingClientRect().height / 2 + "px"
            }
        }
        setup()

        const onLightModeChanged = () => {
            adjustSpacerCodeBasedOnLightMode()
            initialSetup = true
            setup()
        }

        // Has to also fire on dataFetched, because fetched data will change the size of the target Element
        window.addEventListener("customResize", setup)
        window.addEventListener("notifyLightMode", onLightModeChanged)
        window.addEventListener("dataFetched", setup)

        return () => {
            window.removeEventListener("customResize", setup)
            window.removeEventListener("notifyLightMode", onLightModeChanged)
            window.removeEventListener("dataFetched", setup)
        }
    }, [containerRef, spacerRes, targetElementClassName])

    return spacerRes ?
        <div className="spacer" ref={containerRef}>
            <div className="spacer--upper"></div>
            <div className="spacer--lower"></div>
        </div>
        : <ClipLoader
            className="clipLoader" />
}