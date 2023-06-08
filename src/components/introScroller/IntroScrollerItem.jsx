import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer"
import Typewriter from 'typewriter-effect';
import { ClipLoader } from "react-spinners"

export default function IntroScrollerItem({ lan, introButtons = false, introScrollData }) {
    const { ref: textRef, inView, entry } = useInView({
        /* Optional options */
        threshold: .60,
        triggerOnce: true
    });

    useEffect(() => {
        if (!entry) return

        /** @type{HTMLElement} */
        const container = entry.target

        if (inView) {
            if (!container.classList.contains("fadeIn")) {
                container.classList.add("fadeIn")
            }
        }
        else if (!inView) {
            if (container.classList.contains("fadeIn")) {
                container.classList.remove("fadeIn")
            }
        }
    }, [inView])

    return (
        introScrollData ?
            <div className="introScroller--item" ref={textRef}>
                {introScrollData.heading1 && <h1 className="introScroller--item--heading" >{introScrollData.heading1[lan]}</h1>}
                {introScrollData.heading2 && <h1 className="introScroller--item--heading" >{introScrollData.heading2[lan]}</h1>}
                {introButtons &&
                    <div className="introScroller--item--buttons">
                        <a className="introScroller--item--buttons--aboutMe">{introScrollData.buttonTop[lan]}</a>
                        <a className="introScroller--item--buttons--myProjects">{introScrollData.buttonBottom[lan]}</a>
                    </div>
                }
            </div >
            : <ClipLoader />
    )
}