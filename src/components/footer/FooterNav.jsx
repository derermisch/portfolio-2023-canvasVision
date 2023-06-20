import { MakeImgButton } from "../general/MakeImgButton"
import { scrollToLocation } from "../../utils/utils"
import { Link } from "react-router-dom"

export default function FooterNav({ navLinks, showHomeNavigation = true, lan }) {
    const generateImgButtons = () => {
        const imgButtons = []
        for (let i = 0; i < navLinks.length; i++) {
            if (navLinks[i].link) {
                imgButtons.push(
                    <MakeImgButton key={i}>
                        <a
                            className="footer--navigation--link"
                            href={navLinks[i].link}
                        >
                            {navLinks[i].navLink}
                        </a>
                    </MakeImgButton>
                )
            } else {
                imgButtons.push(
                    <MakeImgButton key={i}>
                        <a
                            className="footer--navigation--link"
                            onClick={() => {
                                scrollToLocation(navLinks[i].index)
                            }}
                        >
                            {navLinks[i].navLink}
                        </a>
                    </MakeImgButton>
                )
            }
        }
        return imgButtons
    }

    return <>
        {
            showHomeNavigation ?
                <div className="footer--navigation">
                    < h2 className="footer--navigation--heading" > Navigation</h2 >
                    {generateImgButtons()}
                </div >
                : <Link to={"/"}>{lan === 0 ? "Zurück zur Startseite" : "Back to home"}</Link>
        }
    </>
}