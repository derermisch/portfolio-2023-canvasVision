import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"

import { scrollToLocation, prepareNavLinkArray } from "../../utils/utils"
import ScrollUpButton from "./ScrollUpButton"
import { MakeImgButton } from "../general/MakeImgButton"
import FooterNav from "./FooterNav"
import FooterLegal from "./FooterLegal"

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

    return (
        navLinks ?
            <>
                {/* <ScrollUpButton /> */}
                <section className="footer">
                    <FooterNav
                        navLinks={navLinks}
                        lan={lan}
                        showHomeNavigation={showHomeNavigation}
                    />
                    <FooterLegal
                        lan={lan}
                    />
                </section>
            </>
            : <ClipLoader />
    )
}