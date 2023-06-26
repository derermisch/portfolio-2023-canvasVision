import client from "../../client"
import imageUrlBuilder from "@sanity/image-url"
import { useEffect, useRef } from "react";

export default function ProjectItem({ projectHeading, desktopImgUrl, mobileImgUrl, callToActionText, projectDescription, backgroundColor, callToActionColor, callToActionLink, lan }) {
    const builder = imageUrlBuilder(client)
    const callToActionRef = useRef(null)

    useEffect(() => {
        if (!callToActionRef.current) return

        /** @type{HTMLElement} */
        const callToAction = callToActionRef.current

        callToAction.style.backgroundColor = `#${backgroundColor}`
        callToAction.lastChild.style.backgroundColor = `#${callToActionColor}`
    }, [callToActionRef])

    return <>
        <div className="projects--projectItemContainer--projectItem">
            <article className="projects--projectItemContainer--projectItem--callToAction" ref={callToActionRef}>
                <h1 className="projects--projectItemContainer--projectItem--callToAction--heading">{projectHeading[lan]}</h1>
                <p className="projects--projectItemContainer--projectItem--callToAction--description">{projectDescription[lan]}</p>
                <a href={`${callToActionLink}`} className="projects--projectItemContainer--projectItem--callToAction--button">{callToActionText[lan]}</a>
            </article>
            <img
                className="projects--projectItemContainer--projectItem--desktopImg"
                src={builder.image(desktopImgUrl)}
                alt={`Desktop image of ${projectHeading[lan]}`}
            />
            <img
                className="projects--projectItemContainer--projectItem--mobileImg"
                src={builder.image(mobileImgUrl)}
                alt={`Mobile image of ${projectHeading[lan]}`}
            />
        </div >
    </>
}