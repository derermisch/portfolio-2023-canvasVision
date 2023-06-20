import { Link } from "react-router-dom"

export default function FooterLegal({ lan }) {
    return <div className="footer--rechtliches">
        <h2 className="footer--rechtliches--heading">{lan === 0 ? "Rechtliches" : "Legal notices"}</h2>
        <Link to={"/impressum"}>{lan === 0 ? "Impressum" : "Legal notice"}</Link>
        <Link to={"/datenschutz"}>{lan === 0 ? "Datenschutzerklärung" : "Data protection"}</Link>
    </div>
}