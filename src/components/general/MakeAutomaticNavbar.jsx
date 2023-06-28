import React, { useLayoutEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

export default function MakeAutomaticNavbar({
    children,
    icon = <svg className="hamburger" viewBox="0 0 100 100" width="250" >
        <rect className="top line" width="80" height="5" x="10" y="25">
        </rect>
        <rect className="middle line" width="80" height="5" x="10" y="45">
        </rect>
        <rect className="bottom line" width="80" height="5" x="10" y="65">
        </rect>
    </svg>,
    className,
    backHomeText = "Back to home",
    showHamburgerContainer = true
}) {
    if (!children) {
        return <p>No children provided!</p>
    }
    if (!icon) {
        return <p>No icon provided!</p>
    }
    const location = useLocation().pathname
    // const [showHomeNavigation, setShowHomeNavigation] = useState(() => false)

    // useEffect(() => {
    //     if (location !== "/") {
    //         setShowHomeNavigation(false)
    //     } else {
    //         setShowHomeNavigation(true)
    //     }
    // }, [location])

    const iconContainerRef = useRef(null)
    const linkContainerRef = useRef(null)

    // underline for routes which match location
    useLayoutEffect(() => {
        if (!linkContainerRef.current || !children || !location) return

        /** @type{HTMLElement} */
        const linkContainerEle = linkContainerRef.current

        for (let i = 0; i < children.length; i++) {
            const child = linkContainerEle.firstChild.childNodes[i]
            if (!child) continue
            if (children[i].props.route === location) {
                child.style.textDecoration = "underline"
            } else {
                child.style.textDecoration = "none"
            }
        }
    }, [linkContainerRef, children, location])

    // hamburger
    useLayoutEffect(() => {
        if (!iconContainerRef.current) return
        /** @type{HTMLElement} */
        const iconContainerEle = iconContainerRef.current

        const toggleHamburgerDisplay = () => {
            if (window.innerWidth <= 500) {
                iconContainerEle.style.display = "block"
            } else {
                iconContainerEle.style.display = "none"
            }
        }

        window.addEventListener("resize", toggleHamburgerDisplay)
        window.addEventListener("load", toggleHamburgerDisplay)

        return () => {
            window.removeEventListener("resize", toggleHamburgerDisplay)
            window.removeEventListener("load", toggleHamburgerDisplay)
        }
    }, [iconContainerRef])

    const toggleMenu = () => {
        /** @type{HTMLElement} */
        const iconContainerEle = iconContainerRef.current

        /** @type{HTMLElement} */
        const linkContainerEle = linkContainerRef.current

        document.body.classList.toggle("navOpen")
        iconContainerEle.children[0].classList.toggle("openHamburger")
        linkContainerEle.classList.toggle("openNav")
    }

    return (
        <>
            {showHamburgerContainer && <button
                className="hamburgerContainer"
                ref={iconContainerRef}
                onClick={() => {
                    toggleMenu()
                    window.scrollTo({ top: 0, behavior: "auto" })
                }}
            >
                {icon}
            </button>}

            <div className={className} ref={linkContainerRef}>
                <div className={className + "--links"}>
                    {
                        children
                    }
                </div>
                {/* <div className={className + "--links"}>
                    {
                        showHomeNavigation
                            ?
                            children
                            :
                            <Link to={"/"} className={className + "--links--backHomeLink"}>{backHomeText}</Link>
                    }
                </div> */}
            </div>
        </>
    )
}

/*
    Use case:
    <MakeAutomaticNavbar mobileBreakpoint={500} icon={svg}>
        <div className="nav--links">
            <MakeImgButton icon={<GrHome />}>
                <a className="nav--links--link" href="/">Startseite</a>
            </MakeImgButton>

            <MakeImgButton icon={<GrBusinessService />}>
                <a className="nav--links--link" href="/">Angebot</a>
            </MakeImgButton>

            <MakeImgButton icon={<GrContact />}>
                <a className="nav--links--link" href="/">Kontakt</a>
            </MakeImgButton>

            <MakeImgButton icon={<GrMap />}>
                <a className="nav--links--link" href="/">Anfahrt</a>
            </MakeImgButton>
        </div>
    <MakeAutomaticNavbar/>

    => Adds icon infront of div container
    => Renders normal above 500px screen width
    => Listens for load and window resize
        => when screen width is below 500px, component rerenders
        and just shows the icon.
        OnClick, the menu opens.
*/