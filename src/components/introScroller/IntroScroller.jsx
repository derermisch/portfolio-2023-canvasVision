import IntroScrollerItem from "./IntroScrollerItem";
import BackgroundCanvas from "../general/BackgroundCanvas"
import { DataSource, getServerData } from "../general/DataSource";
import Spacer from "../general/Spacer";
import { useContext } from "react";
import { SettingsContext } from "../general/SettingsContext"
import { useRef } from "react";

export default function IntroScroller() {
    const value = useContext(SettingsContext).value

    return <>
        <div className="introScroller">
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
        </div>
        <BackgroundCanvas targetElementClassName=".introScroller" shape="90deg_down" zoom={.7} />
        <DataSource
            getDataFunc={getServerData('*[_type == "other"][0]{spacerSvgCode}')}
            resourceName="spacerRes">
            <Spacer targetElementClassName=".introScroller" />
        </DataSource>
    </>
}