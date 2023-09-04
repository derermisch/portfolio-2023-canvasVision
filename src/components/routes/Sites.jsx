import Home from "../home/Home"
import IntroScroller from "../introScroller/IntroScroller"
import Services from "../services/Services"
import Contact from "../contact/Contact"
import { DataSource, getServerData } from "../general/DataSource"
import Spacer from "../general/Spacer"

export default function Sites() {
    return (
        <main className="sites">
            <Home />
            <DataSource
                getDataFunc={getServerData('*[_type == "other"][0]{spacerImg{"imgUrl": asset->url}}')}
                resourceName="spacerBg">
                <Spacer />
            </DataSource>
            <IntroScroller />
            <DataSource
                getDataFunc={getServerData('*[_type == "other"][0]{spacerImg{"imgUrl": asset->url}}')}
                resourceName="spacerBg">
                <Spacer />
            </DataSource>
            <Services />
            <DataSource
                getDataFunc={getServerData('*[_type == "other"][0]{spacerImg{"imgUrl": asset->url}}')}
                resourceName="spacerBg">
                <Spacer />
            </DataSource>
            <Contact />
        </main>
    )
}