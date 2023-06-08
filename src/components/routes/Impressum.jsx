import { ClipLoader } from "react-spinners"
import { PortableText } from "@portabletext/react"
// import BlockContent from "@sanity/block-content-to-react"

import Navbar from "../navbar/Navbar"

export default function Impressum({ text, lan }) {
    return (
        text ?
            <section className="impressum site">
                <Navbar />
                <h2 className="impressum--heading">{lan === 0 ? "Impressum" : "Legal notice"}</h2>
                {lan > 0 && <p className="impressum--lanDisclaimer">(There is only a german version of this text available)</p>}
                <article className="impressum--textContainer">
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