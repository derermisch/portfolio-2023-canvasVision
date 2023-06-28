import { useContext } from "react";

import AboutMeEntry from "./AboutMeEntry";
import { DataSource, getServerData } from "../general/DataSource";
import { SettingsContext } from "../general/SettingsContext";
import AboutMeEntries from "./AboutMeEntries";
import Navbar from "../navbar/Navbar"
import Spacer from "../general/Spacer";

export default function AboutMe() {
    const value = useContext(SettingsContext).value

    return <>
        <main className="aboutMe site">
            <Navbar />
            <DataSource
                getDataFunc={getServerData('*[_type == "aboutMe"][0].aboutMeEntries[]{"imgUrl": img.asset->url, heading, text, socialLinks[]{linkName, linkAddress, "iconUrl": iconPng.asset->url}}')}
                resourceName="aboutMeEntries"
            >
                <AboutMeEntries lan={value} />
            </DataSource>
        </main>
        <DataSource
            getDataFunc={getServerData('*[_type == "other"][0]{spacerSvgCode}')}
            resourceName="spacerRes">
            <Spacer targetElementClassName=".aboutMe" />
        </DataSource>
    </>
}