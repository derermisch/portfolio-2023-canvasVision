import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import ScrollUpButtonStatic from "../general/ScrollUpButtonStatic"
import FooterNav from "./FooterNav"
import FooterLegal from "./FooterLegal"
import { DataSource, getServerData } from "../general/DataSource"

export default function Footer({ lan }) {
    const location = useLocation().pathname
    const [showHomeNavigation, setShowHomeNavigation] = useState(() => false)

    useEffect(() => {
        if (location !== "/") {
            setShowHomeNavigation(false)
        } else {
            setShowHomeNavigation(true)
        }
    }, [location])

    return (
        <>
            {/* <ScrollUpButton /> */}
            <section className="footer">
                <ScrollUpButtonStatic />
                <DataSource
                    getDataFunc={getServerData('*[_type == "nav"].navlink[]{navlink, route, link, scrollToClassName}')}
                    resourceName="navlinkData"
                >
                    <FooterNav
                        lan={lan}
                        showHomeNavigation={showHomeNavigation}
                    />
                </DataSource>
                <FooterLegal
                    lan={lan}
                />
            </section>
        </>
    )
}