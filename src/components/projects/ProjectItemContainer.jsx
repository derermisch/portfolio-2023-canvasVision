import ProjectItem from "./ProjectItem"
import { ClipLoader } from "react-spinners";

export default function ProjectItemContainer({ projectData, lan }) {
    return <>{projectData ?
        <section className="projects--projectItemContainer site">
            {projectData.projectData.map((projectItem, i) => {
                return <ProjectItem
                    key={i}
                    lan={lan}
                    projectHeading={projectItem.projectHeading}
                    desktopImgUrl={projectItem.desktopImgUrl}
                    mobileImgUrl={projectItem.mobileImgUrl}
                    callToActionText={projectItem.callToActionText}
                    projectDescription={projectItem.projectDescription}
                    backgroundColor={projectItem.backgroundColor}
                    callToActionColor={projectItem.callToActionColor}
                    callToActionLink={projectItem.callToActionLink}
                />
            })}
        </section> : <ClipLoader
            className="clipLoader" />}
    </>
}