import ClipLoader from "react-spinners/ClipLoader"
import { HashLink as Link } from 'react-router-hash-link';

import { MakeImgButton } from "../general/MakeImgButton"
import MakeAutomaticNavbar from "../general/MakeAutomaticNavbar"

export default function Navlinks({ navlinkData, lan, showHamburgerContainer = true, providedClassName = "nav--linkWrapper" }) {
    const toggleNavMenu = () => { //hacky solution
        const hamburger = document.querySelector(".hamburgerContainer").children[0]
        const navLinkWrapper = document.querySelector(".nav--linkWrapper")
        if (hamburger.classList.contains("openHamburger")) {
            hamburger.classList.remove("openHamburger")
        }
        if (navLinkWrapper.classList.contains("openNav")) {
            navLinkWrapper.classList.remove("openNav")
        }
        if (document.body.classList.contains("navOpen")) {
            document.body.classList.remove("navOpen")
        }
    }

    const generateImgButtons = () => {
        const imgButtons = []
        for (let i = 0; i < navlinkData.length; i++) {
            if (navlinkData[i].link) { // Link to external site
                imgButtons.push(
                    <MakeImgButton key={i}>
                        <a
                            className={`${providedClassName}--links--link`}
                            href={navlinkData[i].link}
                        >
                            {navlinkData[i].navlink[lan]}
                        </a>
                    </MakeImgButton>
                )
            }
            else if (navlinkData[i].route) { // Link to route
                imgButtons.push(
                    <MakeImgButton key={i} route={navlinkData[i].route}>
                        <Link to={`${navlinkData[i].route}`} className={`${providedClassName}--links--link`} onClick={() => toggleNavMenu()}>
                            {navlinkData[i].navlink[lan]}
                        </Link>
                    </MakeImgButton>
                )
            }
            else if (navlinkData[i].scrollToClassName) { // Scroll to location
                imgButtons.push(
                    <MakeImgButton key={i}>
                        <button
                            className={`${providedClassName}--links--link`}
                            onClick={() => {
                                if (location.pathname !== "/") { // scrolling is for homepage only
                                    window.location.href = "/"
                                }
                                document.querySelector(`.${navlinkData[i].scrollToClassName}`).scrollIntoView({ behavior: "smooth" }) // scroll
                                toggleNavMenu() // disable all navmenu associated classes
                            }}
                        >
                            {navlinkData[i].navlink[lan]}
                        </button>
                    </MakeImgButton>
                )
            }
        }
        return imgButtons
    }

    // make navbar, the links are mapped from the received data
    return (
        navlinkData ?
            <MakeAutomaticNavbar
                className={providedClassName}
                backHomeText={lan === 0 ? "Zurück zur Startseite" : "Back to home"}
                showHamburgerContainer={showHamburgerContainer}
            >
                {generateImgButtons()}
            </MakeAutomaticNavbar>
            : <ClipLoader 
 className="clipLoader"/>
    )
}
