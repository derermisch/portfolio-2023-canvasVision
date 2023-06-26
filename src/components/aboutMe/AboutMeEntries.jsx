import AboutMeEntry from "./AboutMeEntry"
import { ClipLoader } from "react-spinners"

export default function AboutMeEntries({ aboutMeEntries, lan }) {
    return aboutMeEntries ?
        <section className="aboutMe--entries">
            {aboutMeEntries.map((entry, i) => {
                return <AboutMeEntry
                    key={i}
                    lan={lan}
                    heading={entry.heading}
                    text={entry.text}
                    imgUrl={entry.imgUrl}
                    socialLinks={entry.socialLinks}
                />
            })}
        </section>
        : <ClipLoader 
 className="clipLoader"/>
} 