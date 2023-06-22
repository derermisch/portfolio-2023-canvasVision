import { useContext } from "react"

import { SettingsContext } from "../general/SettingsContext"
import { DataSource, getServerData } from "../general/DataSource"
import Navlinks from "./Navlinks"
import SettingsToggle from "../general/SettingsToggle"

export default function () {
    const value = useContext(SettingsContext).value

    return (
        <nav className="nav">
            <SettingsToggle renderDarkModeToggle={false} />
            <DataSource
                getDataFunc={getServerData('*[_type == "nav"].navlink[]{navlink, route, link, scrollToClassName}')}
                resourceName="navlinkData"
            >
                <Navlinks lan={value} />
            </DataSource>
        </nav>
    )
}