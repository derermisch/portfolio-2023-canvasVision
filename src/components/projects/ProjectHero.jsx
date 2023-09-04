import { ClipLoader } from "react-spinners";
import Navbar from "../navbar/Navbar";

export default function ProjectHero({ projectsHeroData, lan }) {

    return <div className="projects--heroSection">
        <Navbar />
        {projectsHeroData ? <div className="projects--heroSection--textContainer">
            <h1 className="projects--heroSection--textContainer--heading">
                {projectsHeroData.projectsHeading[lan]}
            </h1>
            <p className="projects--heroSection--textContainer--subHeading">
                {projectsHeroData.projectsSubheading[lan]}
            </p>
            <svg className="projects--heroSection--textContainer--scrollSvg scrollSvg" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.64 1.08797C23.456 2.36797 19.392 6.59197 18.272 11.776C17.792 14.048 17.792 32.032 18.272 34.304C19.808 41.44 27.008 46.432 34.08 45.216C39.872 44.224 44.128 40.32 45.6 34.656C46.208 32.352 46.304 14.464 45.728 11.776C44.096 4.12797 36.224 -0.800029 28.64 1.08797ZM36.672 4.28797C39.136 5.40797 41.312 7.58397 42.464 10.048L43.36 12V23.04V34.08L42.464 36.032C41.312 38.496 39.136 40.672 36.64 41.824C35.008 42.592 34.304 42.72 32 42.72C29.696 42.72 28.992 42.592 27.36 41.824C24.864 40.672 22.688 38.496 21.536 36.032L20.64 34.08V23.04V12L21.536 10.08C24.288 4.22397 30.912 1.66397 36.672 4.28797Z" fill="#EFE9E7" />
                <path d="M31.072 10.048C30.816 10.336 30.72 11.584 30.784 13.6C30.848 16.16 30.976 16.8 31.456 17.088C31.84 17.344 32.16 17.344 32.576 17.088C33.024 16.8 33.152 16.16 33.216 13.6C33.312 10.368 33.088 9.59997 32 9.59997C31.68 9.59997 31.264 9.79197 31.072 10.048Z" fill="#EFE9E7" />
                <path className="projects--heroSection--textContainer--scrollSvg--arrow scrollSvg--arrow" d="M20.896 50.944C20.704 51.168 20.48 51.552 20.32 51.776C20.032 52.288 31.2 63.68 32 63.68C32.256 63.68 34.976 61.184 38.016 58.144C43.712 52.448 44.256 51.616 42.848 50.848C42.208 50.528 41.728 50.944 37.088 55.552L32 60.64L26.944 55.584C24.192 52.832 21.76 50.56 21.568 50.56C21.344 50.56 21.056 50.752 20.896 50.944Z" fill="#2B50AA" />
            </svg>
        </div> : <ClipLoader
            className="clipLoader" />}
    </div>
}