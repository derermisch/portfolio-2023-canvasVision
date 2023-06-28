// Heading based on current language

import { useContext } from "react"

import { SettingsContext } from "./SettingsContext"
import { ClipLoader } from "react-spinners"

export default function Heading({ headingArr, className }) {
    const { value } = useContext(SettingsContext)

    return (
        headingArr ?
            <h2 className={className}>{headingArr[value]}</h2>
            : <ClipLoader 
 className="clipLoader"/>
    )
}