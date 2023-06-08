import BackgroundCanvas from "../general/BackgroundCanvas"
import { DataSource, getServerData } from "../general/DataSource"
import Heading from "../general/Heading"
import AboutMeList from "./AboutMeList"

export default function AboutMe() {
    return (
        <section className="aboutMe">
            <BackgroundCanvas pageMult={3}/>
            {/* <DataSource
                getDataFunc={getServerData('*[_type == "aboutmesite"][0].heading')}
                resourceName="headingArr"
            >
                <Heading className="aboutMe--heading" />
            </DataSource> */}

            {/* <DataSource
                getDataFunc={getServerData('*[_type == "aboutmesite"][0].aboutMeArray[]{itemHeading,itemTextDe,itemTextEn}')}
                resourceName="aboutMeData"
            >
                <AboutMeList />
            </DataSource> */}
        </section>
    )
}