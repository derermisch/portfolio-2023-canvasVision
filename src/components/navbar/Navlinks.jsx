import ClipLoader from "react-spinners/ClipLoader"
import { useState } from "react"
import { useEffect } from "react"

import { scrollToLocation, prepareNavLinkArray, throttle } from "../../utils/utils"
import { MakeImgButton } from "../general/MakeImgButton"
import MakeAutomaticNavbar from "../general/MakeAutomaticNavbar"

export default function Navlinks({ navlinkData, lan }) {
    const [navLinks, setNavLinks] = useState(() => null)

    // Prepare navLinks object with naclinkData: get indexing right
    // If there is a href link, then indexing is skipped
    useEffect(() => {
        if (!navlinkData && !lan) return

        setNavLinks(prepareNavLinkArray(navlinkData, lan))
    }, [navlinkData, lan])


    const toggleNavMenu = () => { //hacky solution
        document.querySelector(".hamburgerContainer").children[0].classList.toggle("openHamburger")
        document.querySelector(".nav--linkWrapper").classList.toggle("openNav")
    }

    const generateImgButtons = () => {
        const imgButtons = []
        for (let i = 0; i < navLinks.length; i++) {
            if (navLinks[i].link) {
                imgButtons.push(
                    <MakeImgButton key={i}>
                        <a
                            className="nav--linkWrapper--links--link"
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
                            className="nav--linkWrapper--links--link"
                            onClick={() => scrollToLocation(navLinks[i].index, toggleNavMenu)}
                        >
                            {navLinks[i].navLink}
                        </a>
                    </MakeImgButton>
                )
            }
        }
        return imgButtons
    }

    // make navbar, the links are mapped from the received data
    return (
        navLinks ?
            <MakeAutomaticNavbar className="nav--linkWrapper" backHomeText={lan === 0 ? "Zurück zur Startseite" : "Back to home"}>
                {generateImgButtons()}
            </MakeAutomaticNavbar>
            : <ClipLoader />
    )
}
