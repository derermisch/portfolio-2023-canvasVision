import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer"
import Typewriter from 'typewriter-effect';
import { ClipLoader } from "react-spinners"
import { useRef } from "react";
import { useState } from "react";

export default function IntroScrollerItem({ lan, introButtons = false, introScrollData }) {
    const { ref: textRef, inView, entry } = useInView({
        /* Optional options */
        threshold: .6,
        triggerOnce: true
    });
    const headingRef = useRef(null)

    useEffect(() => {
        if (!entry) return
        if (!headingRef.current) return

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

    useEffect(() => {
        if (!headingRef.current) return

        let timer = setInterval(onTick, 20)

        if (!inView) {
            complete()
            return
        }

        /** @type{HTMLElement} */
        const heading = headingRef.current

        const textSplit = heading.textContent.split("")
        heading.textContent = ""

        for (let i = 0; i < textSplit.length; i++) {
            heading.innerHTML += "<span>" + textSplit[i] + "</span>"
        }

        let char = 0

        function onTick() {
            const span = heading.querySelectorAll("span")[char]
            span.classList.add("fade")
            char++
            if (char == textSplit.length) {
                complete()
                return
            }
        }

        function complete() {
            clearInterval(timer)
            timer = null
        }
    }, [headingRef, introScrollData, inView])

    return (
        introScrollData ?
            <div className="introScroller--item" ref={textRef}>
                <h1 className="introScroller--item--heading" ref={headingRef}>
                    {introScrollData.heading1 ? introScrollData.heading1[lan] : introScrollData.heading2[lan]}
                </h1>
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