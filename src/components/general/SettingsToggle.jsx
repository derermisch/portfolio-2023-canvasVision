import React, { useState } from "react"
import { useContext } from "react"
import { v4 as uuidv4 } from 'uuid';

import { SettingsContext } from "./SettingsContext"
import { getCurrentLanguage, getCurrentLanguageInputstate, toggleLanguage } from "../../utils/language"
import { getCurrentLightModeInputstate, toggleCurrentLightMode } from "../../utils/darkmode"

const notifyLightModeChangeEvent = new CustomEvent("notifyLightMode")

export default function SettingsToggle() {
    const { value, setValue } = useContext(SettingsContext)

    return (
        <div className="settingsToggle">
            <ToggleContainer
                className="toggle"
                left={
                    // sun
                    <svg data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                        <g data-name="Layer 1" id="icon_sun">
                            <path className="cls-1" d="M5.87 1.47C5.56 1.15 5.28.68 5 0c-.28.68-.56 1.15-.87 1.47.28-.07.57-.12.87-.12s.59.05.87.12Zm2.22 1.62c0-.44.14-.96.44-1.62-.67.3-1.19.44-1.62.44.48.3.89.7 1.18 1.18ZM9.99 5c-.68-.28-1.15-.56-1.47-.87.07.28.12.57.12.87s-.05.59-.12.87c.31-.31.79-.59 1.47-.87ZM1.9 3.09c.3-.48.7-.89 1.18-1.18-.44 0-.96-.14-1.62-.44.3.67.44 1.19.44 1.62ZM0 5c.68.28 1.15.56 1.47.87-.07-.28-.12-.57-.12-.87s.05-.59.12-.87C1.15 4.44.68 4.72 0 5Zm6.91 3.1c.44 0 .96.14 1.62.44-.3-.67-.44-1.19-.44-1.62-.3.48-.7.89-1.18 1.18ZM1.9 6.92c0 .44-.14.96-.44 1.62.67-.3 1.19-.44 1.62-.44-.48-.3-.89-.7-1.18-1.18Zm2.22 1.62c.31.31.59.79.87 1.47.28-.68.56-1.15.87-1.47-.28.07-.57.12-.87.12s-.59-.05-.87-.12Z" />
                            <circle className="cls-1" cx="5" cy="5" r="3.3" />
                            <path className="cls-1" d="M4.42 1.41C4.01 1.24 3.57.92 3.04.4c0 .74-.06 1.28-.23 1.69.23-.17.48-.33.76-.45s.56-.19.85-.23Zm4.17 3.02c.17-.41.49-.85 1.01-1.38-.74 0-1.28-.06-1.69-.23.17.23.33.48.45.76s.19.56.23.85Zm0 1.13c-.09.56-.3 1.09-.63 1.55.4-.17.94-.24 1.67-.23-.53-.5-.87-.92-1.04-1.32ZM6.87.36c-.5.53-.92.87-1.32 1.04.56.09 1.09.3 1.55.63-.17-.4-.24-.94-.23-1.67ZM3.12 9.63c.5-.53.92-.87 1.32-1.04-.56-.09-1.09-.3-1.55-.63.17.4.24.94.23 1.67Zm2.45-1.04c.41.17.85.49 1.38 1.01 0-.74.06-1.28.23-1.69-.23.17-.48.33-.76.45s-.56.19-.85.23ZM1.41 5.58c-.17.41-.49.85-1.01 1.38.74 0 1.28.06 1.69.23-.17-.23-.33-.48-.45-.76s-.19-.56-.23-.85Zm0-1.13c.09-.56.3-1.09.63-1.55-.4.17-.94.24-1.67.23.53.5.87.92 1.04 1.32Z" />
                        </g>
                    </svg>
                }
                onClickFunction={() => {
                    toggleCurrentLightMode()
                    window.dispatchEvent(notifyLightModeChangeEvent)
                }}
                right={
                    // moon
                    <svg data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.78 10" id="icon_moon">
                        <path d="M3.22 5c0 2.13-1.34 3.94-3.22 4.66.55.21 1.15.34 1.78.34 2.76 0 5-2.24 5-5s-2.24-5-5-5C1.15 0 .55.13 0 .34 1.88 1.06 3.22 2.87 3.22 5Z" data-name="Layer 1" />
                    </svg>
                }
                isCheckedFunction={getCurrentLightModeInputstate}
            />
            <ToggleContainer
                // className="settingsToggle--language"
                className="toggle"
                left={
                    // DE
                    <svg data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.62 6.72" id="icon_de">
                        <path d="M0 6.72V0h2.18c2.29 0 3.74 1.26 3.74 3.72 0 2.08-1.49 3-3.26 3H0Zm2.66-.44c1.55 0 2.82-.81 2.82-2.56 0-2.09-1.31-3.28-3.3-3.28H.44v5.84h2.22ZM1.01 1.04h1.03c1.53 0 2.88.86 2.88 2.54 0 1.54-1 2.12-2.36 2.12H1.01V1.04Zm.44 4.22h1.11c1.12 0 1.92-.46 1.92-1.68 0-1.41-1.18-2.1-2.44-2.1h-.59v3.78Zm9.98 1.46H6.56V0h5.02l-.15 1.53H8v.71h2.72l-.17 1.47H8v1.51h3.62l-.19 1.5Zm-.31-1.07H7.57V3.27h2.59l.07-.59H7.57V1.09h3.42l.08-.65H7v5.84h4.04l.08-.63Z" data-name="Layer 1" />
                    </svg>
                }
                onClickFunction={() => {
                    toggleLanguage()

                    // language needs a state update as well, to reflect the value in the react components
                    setValue(getCurrentLanguage())
                }}
                right={
                    // EN
                    <svg data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.49 6.72" id="icon_en">
                        <path d="M4.87 6.72H0V0h5.02l-.15 1.53H1.44v.71h2.72l-.17 1.47H1.44v1.51h3.62l-.19 1.5Zm-.31-1.07H1.01V3.27H3.6l.07-.59H1.01V1.09h3.42l.08-.65H.44v5.84h4.04l.08-.63ZM11.49 0v6.72h-1.01L7.13 2.7v4.02H5.71V0h1.07l3.29 4.03V0h1.42Zm-.98.44v4.83L6.57.44h-.42v5.84h.54V1.5l3.99 4.78h.37V.44h-.54Z" data-name="Layer 1" />
                    </svg>
                }
                isCheckedFunction={getCurrentLanguageInputstate}
            />
        </div>
    )
}

const ToggleContainer = ({ className, left, onClickFunction, right, isCheckedFunction }) => {
    // return (
    //     <div className={className}>
    //         {React.cloneElement(left, { className: className + "--left" })}
    //         <input type="checkbox" className="--toggleContainer" onClick={() => onClickFunction()} />
    //         {React.cloneElement(right, { className: className + "--right" })}
    //     </div>
    // )
    const [id, setId] = useState(() => uuidv4())
    return (
        <label className={className} htmlFor={id}>
            <input
                className={className + "--input"}
                name={className + "--input"} id={id}
                type="checkbox"
                onClick={() => {
                    window.getSelection().empty()
                    onClickFunction()
                }}
                defaultChecked={isCheckedFunction()}
            />
            <div className={className + "--container"}>
                {React.cloneElement(left, { className: className + "--container--left" })}
                {React.cloneElement(right, { className: className + "--container--right" })}
            </div>
        </label>
    )
}