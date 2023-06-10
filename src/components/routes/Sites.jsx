import Home from "../home/Home"
import IntroScroller from "../introScroller/IntroScroller"
import Services from "../services/Services"
import Projects from "../projects/Projects"
import AboutMe from "../abouteMe/AboutMe"
import Contact from "../contact/Contact"

export default function Sites() {
    return (
        <main className="sites">
            <Home />
            <IntroScroller />
            <Services />
            {/* <Projects /> */}
            {/* <AboutMe /> */}
            {/* <Contact /> */}
        </main>
    )
}