import { ClipLoader } from "react-spinners"

import { scrollToLocation } from "../../utils/utils"

export default function WelcomeContainer({ welcomeData, lan }) {
    return (
        welcomeData ?
            <div className="home--welcomeContainer">
                <img src={welcomeData.imgUrl} alt="" className="home--welcomeContainer--img" />
                <div className="home--welcomeContainer--buttonContainer">
                    <a
                        className="home--welcomeContainer--buttonContainer--button"
                        onClick={() => scrollToLocation(3)}
                    >
                        {welcomeData.contact[lan]}
                    </a>
                    <a
                        className="home--welcomeContainer--buttonContainer--button"
                        href={welcomeData.githubLink}
                        target={"_blank"}
                    >
                        {welcomeData.github[lan]}
                    </a>
                </div>
            </div>
            : <ClipLoader />
    )
}