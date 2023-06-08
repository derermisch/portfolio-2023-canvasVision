import { useLocation, Link } from "react-router-dom"
import { ClipLoader } from "react-spinners"

export default function FormHandle({ requestInfo, lan }) {
    const locationState = useLocation().state

    return (
        requestInfo ?
            <section className="formHandle site">
                {
                    <div className="formHandle--message">
                        {
                            locationState.wasOk 
                                ?
                                <p className="message">{requestInfo.reqSuccess[lan]}</p>
                                :
                                <p className="message">{requestInfo.reqFail[lan]}</p>
                        }

                    </div>
                }
                <Link className="formHandle--backLink" to={"/"}>Zurück zur Startseite</Link>
            </section>
            : <ClipLoader />
    )
}