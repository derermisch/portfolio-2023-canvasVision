import { useContext } from "react";

import ProjectHero from "./ProjectHero";
import ProjectItemContainer from "./ProjectItemContainer";
import { DataSource, getServerData } from "../general/DataSource";
import { SettingsContext } from "../general/SettingsContext";
import Spacer from "../general/Spacer";

export default function Projects() {
    const value = useContext(SettingsContext).value

    return <main className="projects site">
        <DataSource
            getDataFunc={getServerData('*[_type == "projects"][0]{projectsHeading, projectsSubheading}')}
            resourceName={"projectsHeroData"}
        >
            <ProjectHero lan={value} />
        </DataSource>
        <DataSource
            getDataFunc={getServerData('*[_type == "other"][0]{spacerImg{"imgUrl": asset->url}}')}
            resourceName="spacerBg">
            <Spacer />
        </DataSource>
        <DataSource
            getDataFunc={getServerData('*[_type == "projects"][0]{"projectData": projectItems[]{projectHeading, "desktopImgUrl": desktopImage.asset->url,"mobileImgUrl": mobileImage.asset->url, callToActionText, projectDescription, backgroundColor, callToActionColor, callToActionLink}}')}
            resourceName={"projectData"}
        >
            <ProjectItemContainer lan={value} />
        </DataSource>
    </main>

}