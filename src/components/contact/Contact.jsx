import { DataSource, getServerData } from "../general/DataSource"
import Formular from "./Formular"
import Heading from "../general/Heading"
import BackgroundCanvas from "../general/BackgroundCanvas"

export default function Contact() {
    return (
        <section className="contact">
            {/* <BackgroundCanvas pageMult={4} /> */}
            <DataSource
                getDataFunc={getServerData('*[_type == "contact"][0].heading')}
                resourceName="headingArr"
            >
                <Heading className="contact--heading"/>
            </DataSource>

            <DataSource
                getDataFunc={getServerData('*[_type == "contact"][0]{email, lawText, message, name, sendMessage}')}
                resourceName="dataForForm"
            >
                <Formular />
            </DataSource>
        </section>
    )
}