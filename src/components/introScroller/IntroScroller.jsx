import { useContext } from "react";

import IntroScrollerItem from "./IntroScrollerItem";
// import BackgroundCanvas from "../general/BackgroundCanvas"
import { DataSource, getServerData } from "../general/DataSource";
import Spacer from "../general/Spacer";
import { SettingsContext } from "../general/SettingsContext"

export default function IntroScroller() {
    const value = useContext(SettingsContext).value

    return <>
        <section className="introScroller site">
            <DataSource
                getDataFunc={getServerData('*[_type == "introScrollerSite"][0]{heading1}')}
                resourceName="introScrollData">
                <IntroScrollerItem lan={value} />
            </DataSource>
            <DataSource
                getDataFunc={getServerData('*[_type == "introScrollerSite"][0]{heading2, buttonTop, buttonBottom}')}
                resourceName="introScrollData">
                <IntroScrollerItem lan={value} introButtons={true} />
            </DataSource>
        </section>
        {/* <BackgroundCanvas targetElementClassName=".introScroller" shape="90deg_down" zoom={.7} /> */}
        {/* <DataSource
            getDataFunc={getServerData('*[_type == "other"][0]{spacerSvgCode}')}
            resourceName="spacerRes">
            <Spacer targetElementClassName=".introScroller" />
        </DataSource> */}
    </>
}