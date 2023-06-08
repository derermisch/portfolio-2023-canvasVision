import { PortableText } from "@portabletext/react"
import { ClipLoader } from "react-spinners"
// import BlockContent from "@sanity/block-content-to-react"

import Navbar from "../navbar/Navbar"

export default function Datenschutz({ text, lan }) {
    return (
        text ?
            <section className="datenschutz site">
                <Navbar />
                <h2 className="datenschutz--heading">{lan === 0 ? "Datenschutz" : "Data protection"}</h2>
                {lan > 0 && <p className="datenschutz--lanDisclaimer">(There is only a german version of this text available)</p>}
                <article className="datenschutz--textContainer">
                    <PortableText
                        // value={lan === 0 ? text.text_de : text.text_en}
                        value={text.text_de}
                    // projectId={import.meta.env.VITE_SANITY_PROJECT_ID}
                    // dataset="production"
                    />
                </article>
            </section>
            : <ClipLoader />
    )
}