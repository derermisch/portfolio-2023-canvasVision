import { useContext } from "react";

import { DataSource, getServerData } from "../general/DataSource";
import { SettingsContext } from "../general/SettingsContext";
import AboutMeEntries from "./AboutMeEntries";
import Navbar from "../navbar/Navbar"

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
    </>
}