import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"

import { scrollToLocation, prepareNavLinkArray } from "../../utils/utils"
import ScrollUpButton from "./ScrollUpButton"
import { MakeImgButton } from "../general/MakeImgButton"

export default function Footer({ navlinkData, lan }) {
    const location = useLocation().pathname
    const [showHomeNavigation, setShowHomeNavigation] = useState(() => false)

    const [navLinks, setNavLinks] = useState(() => null)

    useEffect(() => {
        if (location !== "/") {
            setShowHomeNavigation(false)
        } else {
            setShowHomeNavigation(true)
        }
    }, [location])

    // TODO: Refactor this useEffect and generateImgButtons functions
    // (used here and in Navlinks.jsx..)
    useEffect(() => {
        if (!navlinkData && !lan) return

        setNavLinks(prepareNavLinkArray(navlinkData, lan))
    }, [navlinkData, lan])

    const generateImgButtons = () => {
        const imgButtons = []
        for (let i = 0; i < navLinks.length; i++) {
            if (navLinks[i].link) {
                imgButtons.push(
                    <MakeImgButton key={i}>
                        <a
                            className="footer--navigation--link"
                            href={navLinks[i].link}
                        >
                            {navLinks[i].navLink}
                        </a>
                    </MakeImgButton>
                )
            } else {
                imgButtons.push(
                    <MakeImgButton key={i}>
                        <a
                            className="footer--navigation--link"
                            onClick={() => {
                                scrollToLocation(navLinks[i].index)
                            }}
                        >
                            {navLinks[i].navLink}
                        </a>
                    </MakeImgButton>
                )
            }
        }
        return imgButtons
    }

    return (
        navLinks ?
            <>
                <ScrollUpButton />
                <section className="footer">
                    {
                        showHomeNavigation ?
                            <div className="footer--navigation">
                                <h2 className="footer--navigation--heading">Navigation</h2>
                                {generateImgButtons()}
                            </div>
                            : <Link to={"/"}>{lan === 0 ? "Zurück zur Startseite" : "Back to home"}</Link>
                    }

                    <div className="footer--rechtliches">
                        <h2 className="footer--rechtliches--heading">{lan === 0 ? "Rechtliches" : "Legal notices"}</h2>
                        <Link to={"/impressum"}>{lan === 0 ? "Impressum" : "Legal notice"}</Link>
                        <Link to={"/datenschutz"}>{lan === 0 ? "Datenschutzerklärung" : "Data protection"}</Link>
                    </div>
                </section>
            </>
            : <ClipLoader />
    )
}