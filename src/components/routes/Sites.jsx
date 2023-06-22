import Home from "../home/Home"
import IntroScroller from "../introScroller/IntroScroller"
import Services from "../services/Services"
import Projects from "../projects/Projects"
import Contact from "../contact/Contact"

export default function Sites() {
    return (
        <main className="sites">
            <Home />
            <IntroScroller />
            <Services />
            <Contact />
        </main>
    )
}