import { useContext } from "react"
import { SettingsContext } from "../general/SettingsContext"
import { DataSource, getServerData } from "../general/DataSource"
import HeroSectionLeft from "./HeroSectionLeft"
import HeroSectionRight from "./HeroSectionRight"

export default function HeroSection() {
    const value = useContext(SettingsContext).value

    return (
        <section className="home--heroSection">
            <DataSource
                getDataFunc={getServerData('*[_type == "home"][0]{headingLeft, subheadingLeft, callToActionBtnLeft}')}
                resourceName={"heroLeft"}
            >
                <HeroSectionLeft lan={value} />
            </DataSource>
            <DataSource
                getDataFunc={getServerData('*[_type == "home"][0]{"imgUrl": imgRight.asset->url}')}
                resourceName={"heroRight"}
            >
                <HeroSectionRight lan={value} />
            </DataSource>
        </section>
    )
}