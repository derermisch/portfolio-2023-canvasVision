import { useContext } from "react"

import { DataSource, getServerData } from "../general/DataSource"
import { SettingsContext } from "../general/SettingsContext"
import Navbar from "../navbar/Navbar"
import HeroSection from "./HeroSection"
import Spacer from "../general/Spacer"
import BackgroundCanvas from "../general/BackgroundCanvas"

export default function Home() {
    const value = useContext(SettingsContext).value

    return (
        <section className="home">
            <Navbar />
            <HeroSection />
            <DataSource
                getDataFunc={getServerData('*[_type == "other"][0]{spacerSvgCode}')}
                resourceName="spacerRes">
                <Spacer pageMult={1} />
            </DataSource>
            <BackgroundCanvas />
        </section>
    )
}