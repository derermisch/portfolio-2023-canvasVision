import { useContext, useEffect, useRef, useState } from "react"
import { ClipLoader } from "react-spinners"

import { SettingsContext } from "../general/SettingsContext"
// import { determineIfMobile } from "../../utils/utils"
import AboutMeItem from "./AboutMeItem"

export default function AboutMeList({ aboutMeData }) {
    const { value } = useContext(SettingsContext)

    const [visibleArr, setVisibleArr] = useState(() => null)

    useEffect(() => {
        if (!aboutMeData) return

        setVisibleArr(() => {
            return Array.from({ length: aboutMeData.length }, (el, i) => {
                return (i === 0) ? true : false
            })
        })
    }, [aboutMeData])


    const toggleVisibility = (number) => {
        const newArr = []
        setVisibleArr(prev => {
            prev.forEach((el, i) => {
                if (i === number) {
                    newArr.push(!el)
                } else {
                    newArr.push(el)
                }
            })
            return newArr
        })
    }

    return (
        aboutMeData ?
            <div className="aboutMe--listContainer">
                {aboutMeData.map((aboutItem, i) => {
                    return <AboutMeItem
                        key={i}
                        number={i}
                        lan={value}
                        heading={aboutItem.itemHeading}
                        textDe={aboutItem.itemTextDe}
                        textEn={aboutItem.itemTextEn}
                        toggleVisibility={toggleVisibility}
                        visibility={(visibleArr ? visibleArr[i] : false)}
                        // isMobile={determineIfMobile()}
                    />
                })}
            </div>
            : <ClipLoader />
    )
}