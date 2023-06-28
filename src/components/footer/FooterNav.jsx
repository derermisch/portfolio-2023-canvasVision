import { Link } from "react-router-dom"
import Navlinks from "../navbar/Navlinks"

export default function FooterNav({ navlinkData, showHomeNavigation = true, lan }) {
    return <>
        {
            navlinkData ?
                <div className="footer--navigation">
                    < h2 className="footer--navigation--heading" >Navigation</h2 >
                    <Navlinks navlinkData={navlinkData} showHamburgerContainer={false} providedClassName="footer--navigation--linkWrapper" lan={lan} />
                </div >
                : <Link to={"/"}>{lan === 0 ? "Zurück zur Startseite" : "Back to home"}</Link>
        }
    </>
}