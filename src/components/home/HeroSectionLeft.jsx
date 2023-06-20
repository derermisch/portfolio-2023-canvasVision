import { ClipLoader } from "react-spinners"

export default function HeroSectionLeft({ heroLeft, lan }) {
    return heroLeft ?
        <div className="home--heroSection--left">
            <div className="home--heroSection--left--textContainer">
                <h1 className="home--heroSection--left--textContainer--heading">{heroLeft.headingLeft[0]}</h1>
                {/* <h1 className="home--heroSection--left--textContainer--heading">{document.body.clientWidth}</h1> */}
                <p className="home--heroSection--left--textContainer--subHeading">{heroLeft.subheadingLeft[lan]}</p>
            </div>
            <button onClick={() => document.querySelector(".services").scrollIntoView({ behavior: "smooth" })} className="home--heroSection--left--callToAction">
                {heroLeft.callToActionBtnLeft[lan]}
            </button>
        </div>
        : <ClipLoader />
}