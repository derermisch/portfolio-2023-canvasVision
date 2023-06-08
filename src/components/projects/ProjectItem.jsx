import { useContext, useEffect, useRef } from "react"

import { SettingsContext } from "../general/SettingsContext"
import { MakeImgButton } from "../general/MakeImgButton"

export default function ProjectItem({ imgUrl, heading, liveLink, githubLink }) {
    const { value } = useContext(SettingsContext)

    const imgRef = useRef(null)
    const headingRef = useRef(null)

    useEffect(() => {
        const adjustHeadingFontSize = () => {
            if (!imgRef.current || !headingRef.current) return

            /** @type{HTMLElement} */
            const img = imgRef.current
            /** @type{HTMLElement} */
            const heading = headingRef.current

            heading.style.fontSize = "1px"

            const currentFontSize = parseInt(getComputedStyle(heading).fontSize.slice(0, -2), 10)
            const goalWidth = img.clientWidth
            const textWidth = heading.clientWidth
            const applyPadding = .25
            const scaleFactor = (goalWidth - (goalWidth * applyPadding)) / textWidth
            const goalFontSize = currentFontSize * scaleFactor

            // console.log("current font size: ", currentFontSize)
            // console.log("goal Width: ", goalWidth)
            // console.log("text Width: ", textWidth)
            // console.log("scale factor: ", scaleFactor)
            // console.log("goal font size: ", goalFontSize)

            headingRef.current.style.fontSize = `${goalFontSize}px`
        }
        adjustHeadingFontSize()

        window.addEventListener("resize", adjustHeadingFontSize)
        window.addEventListener("load", adjustHeadingFontSize)

        return () => {
            window.removeEventListener("resize", adjustHeadingFontSize)
            window.removeEventListener("load", adjustHeadingFontSize)
        }
    }, [imgRef])

    return (
        <>
            {/* <div className="projects--projectContainer--gradient"></div> */}
            <div className="projects--projectContainer--projectItem" onClick={() => {
                if (liveLink) {
                    window.open(liveLink)
                } else {
                    window.open(githubLink)
                }
            }}>
                <img className="projects--projectContainer--projectItem--img" src={imgUrl} alt="" ref={imgRef} />
                <h3 className="projects--projectContainer--projectItem--heading" ref={headingRef}>{heading[value]}</h3>
                <div className="projects--projectContainer--projectItem--buttonContainer">
                    {liveLink && <a className="projects--projectContainer--projectItem--buttonContainer--liveView" target={"_blank"} href={liveLink}>
                        {value === 0 ? "Live ansehen" : "Live view"}
                    </a>}
                    {githubLink && <MakeImgButton>
                        <a className="projects--projectContainer--projectItem--buttonContainer--gitHub" href={githubLink} target={"_blank"}>GitHub</a>
                    </MakeImgButton>}
                </div>
            </div>
        </>
    )
}