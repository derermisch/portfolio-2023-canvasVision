import ProjectItem from "./ProjectItem"
import { ClipLoader } from "react-spinners";
import { DataSource, getServerData } from "../general/DataSource";
import Spacer from "../general/Spacer";

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
        </section> : <ClipLoader />}
        <DataSource
            getDataFunc={getServerData('*[_type == "other"][0]{spacerSvgCode}')}
            resourceName="spacerRes">
            <Spacer targetElementClassName=".projects--projectItemContainer" />
        </DataSource>
    </>
}