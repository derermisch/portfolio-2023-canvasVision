import { DataSource, getServerData } from "../general/DataSource"
import ServiceItemContainer from "./ServiceItemContainer"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { SettingsContext } from "../general/SettingsContext"
// import BackgroundCanvas from "../general/BackgroundCanvas"
import Spacer from "../general/Spacer"
import { useInView } from "react-intersection-observer"
import CustomButton from "./CustomButton"
// import { drawDebugRect } from "../../utils/debug"

const serviceItemVisibleEvent = new CustomEvent("serviceItemVisible", {
    detail: {
        activated: []
    }
})

export default function Services() {
    const [contactBtnVisible, setContactBtnVisible] = useState(() => false)
    const value = useContext(SettingsContext).value
    const lineRef = useRef(null)
    const headingRef = useRef(null)
    const pageRef = useRef(null)
    const [gridHeight, setGridHeight] = useState(() => 0)
    const { ref: inViewRef, inView } = useInView({
        threshold: .1
    })
    const setRefs = useCallback((node) => {
        lineRef.current = node
        inViewRef(node)
    }, [inViewRef])

    const { ref: pageInViewRef, inView: pageInView } = useInView({})

    const setPageRef = useCallback((node) => {
        pageRef.current = node
        pageInViewRef(node)
    }, [pageInViewRef])


    function convertRemToPixels(rem) {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    useEffect(() => {
        if (gridHeight === 0) return
        if (!lineRef.current || !inView) return

        // for svg fill
        /** @type{HTMLElement} */
        const linesSvg = lineRef.current
        const lineMain = linesSvg.childNodes[0]
        const lineLoading = linesSvg.childNodes[1]
        const lineLength = lineMain.getTotalLength()
        lineLoading.style.stroke = "var(--clr-action)"
        lineLoading.style.strokeDasharray = lineLength
        const offset = .4 * innerHeight

        // for routes
        const routes = document.querySelectorAll(".route")

        const onScrollEvent = () => {
            // fill scrollbar based on scroll, with added offset
            const top = linesSvg.getBoundingClientRect().top
            const height = linesSvg.getBoundingClientRect().height
            const currentProgress = innerHeight - top
            let progress = lineLength - ((currentProgress / height) * lineLength) + offset
            if (scrollY + innerHeight > scrollY + top + height + offset) {
                progress = 0
            }
            if (progress < 0)
                return
            lineLoading.style.strokeDashoffset = progress
            const progressPercent = 1 - (progress / lineLength)
            if (progressPercent >= 1) {
                setContactBtnVisible(true)
            } else {
                setContactBtnVisible(false)
            }

            // check if there are routes which should be "activated", meaning their animation should start
            for (let i = 0; i < routes.length; i++) {
                const stepRoute = (routes[i].getBoundingClientRect().top + routes[i].getBoundingClientRect().height / 2 - top) / lineLength

                if (progressPercent > stepRoute) {
                    if (!serviceItemVisibleEvent.detail.activated.includes(i)) {
                        serviceItemVisibleEvent.detail.activated.push(i)
                    }
                    dispatchEvent(serviceItemVisibleEvent)

                    if (!routes[i].classList.contains("fillPop")) {
                        routes[i].classList.add("fillPop")
                    }
                }
                else {
                    const ind = serviceItemVisibleEvent.detail.activated.indexOf(i); // Find the index of the item
                    if (ind !== -1) {
                        serviceItemVisibleEvent.detail.activated.splice(ind, 1); // Remove the item using splice
                    }
                    dispatchEvent(serviceItemVisibleEvent)

                    if (routes[i].classList.contains("fillPop")) {
                        routes[i].classList.remove("fillPop")
                    }
                }
            }
        }

        window.addEventListener("scroll", onScrollEvent)

        return () => {
            window.removeEventListener("scroll", onScrollEvent)
        }
    }, [lineRef, inView])

    useEffect(() => {
        if (gridHeight === 0) return
        if (!lineRef.current || !headingRef.current) return

        const resizeSvgLine = () => {
            // references
            /** @type{HTMLElement} */
            const headingEle = headingRef.current
            /** @type{HTMLElement} */
            const svgEle = lineRef.current
            const lineMain = svgEle.childNodes[0]
            const lineLoading = svgEle.childNodes[1]

            // configure svg
            svgEle.setAttribute("viewBox", `0 0 ${document.body.clientWidth} ${gridHeight}`);
            // drawDebugRect(headingEle.getBoundingClientRect().top + Number(scrollY))
            svgEle.style.top = headingEle.getBoundingClientRect().bottom + Number(scrollY)

            // configure lines to have length of grid (+ margin)
            lineMain.setAttribute("x1", document.body.clientWidth / 2)
            lineMain.setAttribute("y1", 0)
            lineMain.setAttribute("x2", document.body.clientWidth / 2)
            lineMain.setAttribute("y2", gridHeight)
            lineLoading.setAttribute("x1", document.body.clientWidth / 2)
            lineLoading.setAttribute("y1", 0)
            lineLoading.setAttribute("x2", document.body.clientWidth / 2)
            lineLoading.setAttribute("y2", gridHeight)
        }

        const onResizeEvent = () => {
            resizeSvgLine()
        }
        onResizeEvent()

        window.addEventListener("resize", onResizeEvent)

        return () => {
            window.removeEventListener("resize", onResizeEvent)
        }

    }, [lineRef, gridHeight, headingRef, pageInView])

    const signalReady = (containerHeight) => {
        // +12 rem, because of margin-block: 6rem in Css
        setGridHeight(() => Number(containerHeight) + convertRemToPixels(12))
    }

    return (<>
        <section className="services site" id="services" ref={setPageRef}>
            <h1 className="services--heading" ref={headingRef}>Services</h1>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ref={setRefs} className="services--line">
                <line className="services--line--main" x1="50" y1="0" x2="50" y2="100" stroke="black" />
                <line className="services--line--loading" x1="50" y1="0" x2="50" y2="100" stroke="black" />
            </svg>
            <DataSource
                getDataFunc={getServerData('*[_type == "services"][0].serviceItemsArray[]{serviceItem}')}
                resourceName={"serviceData"}
            >
                <ServiceItemContainer lan={value} signalFunc={signalReady} />
            </DataSource>
            <DataSource
                getDataFunc={getServerData('*[_type == "services"][0].contactBtn')}
                resourceName={"btnText"}
            >
                <CustomButton
                    onClickFunction={() => document.querySelector(".contact").scrollIntoView({ behavior: "smooth" })}
                    lan={value}
                    className={`services--toContactButton ${contactBtnVisible && "fadeIn"}`}
                    showArrow={true}
                />
            </DataSource>
        </section>
        {/* <BackgroundCanvas targetElementClassName=".services" shape="90deg_up" /> */}
        <DataSource
            getDataFunc={getServerData('*[_type == "other"][0]{spacerSvgCode}')}
            resourceName="spacerRes">
            <Spacer targetElementClassName=".services" />
        </DataSource>
    </>
    )
}