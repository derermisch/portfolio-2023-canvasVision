import { ClipLoader } from "react-spinners"

import ProjectItem from "./ProjectItem"
import sanityClient from "../../client"
import imageUrlBuilder from '@sanity/image-url'
import { useEffect, useLayoutEffect, useRef } from "react"
import { getCurrentLightMode, hex2rgba } from "../../utils/darkmode"

const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
    return builder.image(source)
}

export default function ProjectContainer({ projects, projectsInView }) {
    const gradientRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        const positionGradient = () => {
            if (!gradientRef.current || !containerRef.current || !projectsInView) return

            /** @type{HTMLElement} */
            const gradient = gradientRef.current
            /** @type{HTMLElement} */
            const container = containerRef.current
            const containerBox = container.getBoundingClientRect()

            // positioning
            gradient.style.top = (containerBox.top + scrollY) + "px"
            gradient.style.height = containerBox.height + "px"

            // gradient based on lightMode
            const lightMode = getCurrentLightMode()
            const color = (lightMode === "dark") ? "#404040" : "#F8F7FF"
            gradient.style.backgroundImage = `linear-gradient(to right, ${hex2rgba(color, 0)} , ${hex2rgba(color, 1)})`
        }
        positionGradient()

        window.addEventListener("resize", positionGradient)

        return () => {
            window.removeEventListener("resize", positionGradient)
        }
    }, [gradientRef, containerRef, projectsInView])

    return (
        projects ?
            <>
                <div className="projects--gradient" ref={gradientRef}></div>
                <div className="projects--projectContainer" ref={containerRef}>
                    {projects.map((project, i) => {
                        // if (i > 0) return
                        return <ProjectItem
                            key={i}
                            imgUrl={urlFor(project.imgUrl).width(500).height(500).url()}
                            heading={project.projektHeading}
                            liveLink={project.projectLiveLink}
                            githubLink={project.projectGithubLink}
                        />
                    })}
                </div>
            </>
            : <ClipLoader />
    )
}