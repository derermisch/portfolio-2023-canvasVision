import { useEffect, useRef } from "react"
import client from "../../client"
import imageUrlBuilder from "@sanity/image-url"
import { PortableText } from "@portabletext/react"

export default function AboutMeEntry({ imgUrl, heading, text, socialLinks, lan }) {
    const builder = imageUrlBuilder(client)
    const containerRef = useRef(null)

    return <article className="aboutMe--entries--entry">
        <div className="aboutMe--entries--entry--leftContainer">
            {imgUrl && <img className="aboutMe--entries--entry--leftContainer--img" src={builder.image(imgUrl).width(800).height(800)} alt="About Me" />
            }
        </div>
        <div className="aboutMe--entries--entry--rightContainer">
            <div className="aboutMe--entries--entry--rightContainer--textContainer">
                {heading && <h2 className="aboutMe--entries--entry--rightContainer--textContainer--heading">{heading[lan]}</h2>}
                {text && <div className="aboutMe--entries--entry--rightContainer--textContainer--text">
                    <PortableText value={text[lan].blockContent} />
                </div>}
            </div>
            {socialLinks && <div className="aboutMe--entries--entry--rightContainer--linkContainer" ref={containerRef}>
                {socialLinks.map((socialLink, i) => {
                    return <img
                        className="aboutMe--entries--entry--rightContainer--linkContainer--socialLink"
                        key={i}
                        src={builder.image(socialLink.iconUrl)}
                        alt={socialLink.linkName[lan]}
                    />
                })}
            </div>}
        </div>
    </article>
}