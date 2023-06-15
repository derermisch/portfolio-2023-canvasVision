import { useEffect, useRef, useState, forwardRef } from "react"
import { ClipLoader } from "react-spinners"
import { getCurrentLightMode } from "../../utils/darkmode"
import useResizeObserver from "use-resize-observer";
// svg-code from https://app.haikei.app/. Dimensions: 1000 x 100
export default function ReactSpacer({ spacerRes, targetElementClassName = null }) {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return
        if (!spacerRes) return
        if (!targetElementClassName) return

        let myTarget = document.querySelector(targetElementClassName)
        let myTargetRect = myTarget.getBoundingClientRect()

        /** @type{HTMLElement} */
        const container = containerRef.current
        const lowerSpacer = container.lastChild
        let spacerCode = spacerRes.spacerSvgCode

        const setup = () => {
            const svg64 = window.btoa(spacerCode)
            container.childNodes.forEach(child => {
                child.style.backgroundImage = `url('data:image/svg+xml;base64,${svg64}')`
                child.style.width = document.documentElement.clientWidth + "px"
            })
            lowerSpacer.style.rotate = "180deg"
            container.style.top = myTargetRect.height + myTargetRect.top + Number(scrollY) - container.getBoundingClientRect().height / 2 + "px"
        }
        setup()

        const adjustSpacerCodeBasedOnLightMode = () => {
            let newColor = "#22222"
            getCurrentLightMode() === "dark" ? newColor = "#EFE9E7" : newColor = "#272727"
            spacerCode = spacerCode.replace(/fill*=["'][^"']*["']/i, `fill="${newColor}"`);
        }
        adjustSpacerCodeBasedOnLightMode()

        const setUpSpacer = () => {
            // Get updated reference (including updated bounding box), but just if sizing has changed
            const tmp = document.querySelector(targetElementClassName)
            const tmpRect = tmp.getBoundingClientRect()
            if (myTargetRect.height !== tmpRect.height || myTargetRect.width !== tmpRect.width || myTargetRect.top !== tmpRect.top) {
                // console.log("There is a height difference")
                myTarget = tmp
                myTargetRect = tmpRect

            } else {
                // console.log("nothing changed")
                return
            }
            setup()
        }
        setUpSpacer()

        const onLightModeChange = () => {
            adjustSpacerCodeBasedOnLightMode()
            setup()
        }

        // Has to also fire on dataFetched, because fetched data will change the size of the target Element
        window.addEventListener("customResize", setUpSpacer)
        window.addEventListener("notifyLightMode", onLightModeChange)
        window.addEventListener("dataFetched", setUpSpacer)

        return () => {
            window.removeEventListener("resize", setUpSpacer)
            window.removeEventListener("notifyLightMode", onLightModeChange)
            window.removeEventListener("dataFetched", setUpSpacer)
        }
    }, [containerRef, spacerRes, targetElementClassName])

    return spacerRes ?
        <div className="spacer" ref={containerRef}>
            <div className="spacer--upper"></div>
            <div className="spacer--lower"></div>
        </div>
        : <ClipLoader />
}