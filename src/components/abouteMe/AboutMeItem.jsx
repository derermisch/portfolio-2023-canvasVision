import { PortableText } from "@portabletext/react"


export default function AboutMeItem({ number, heading, lan, textDe, textEn, toggleVisibility, visibility, /*isMobile*/ }) {
    return (
        <div className="aboutMe--listContainer--listItem">
            <div className="aboutMe--listContainer--listItem--headingContainer">
                <h3 className="aboutMe--listContainer--listItem--headingContainer--number">{number.toString().padStart(2, "0")}</h3>
                <h4
                    className="aboutMe--listContainer--listItem--headingContainer--heading"
                    // onClick={isMobile ? (() => toggleVisibility(number)) : () => { }}
                    onClick={() => {
                        toggleVisibility(number)
                        document.querySelectorAll('.aboutMe--listContainer--listItem--headingContainer--heading')[number].scrollIntoView({ behavior: "smooth", block: "center"});
                    }}
                >
                    {heading[lan]}
                </h4>
                <button className="aboutMe--listContainer--listItem--headingContainer--arrow" onClick={() => toggleVisibility(number)}>{">"}</button>
            </div>
            {
                visibility &&
                <div className="aboutMe--listContainer--listItem--textContainer">
                    {
                        (lan === 0) ?
                            <PortableText className="aboutMe--listContainer--listItem--text" value={textDe} />
                            :
                            <PortableText className="aboutMe--listContainer--listItem--text" value={textEn} />
                    }
                </div>
            }
        </div>
    )
}