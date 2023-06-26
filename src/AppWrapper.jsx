import { useState, useEffect } from "react"
import { ClipLoader } from "react-spinners"
import { useLocation } from "react-router-dom"
import CanvasBackground from "./components/general/CanvasBackground"

import App from "./App"

export default function AppWrapper() {
    const [allLoaded, setAllLoaded] = useState(() => false)
    const location = useLocation().pathname

    // useEffect(() => {

    //     const onPageLoad = () => {
    //         setAllLoaded(true)
    //         document.documentElement.scrollTo({
    //             top: 0,
    //             left: 0,
    //             behavior: "instant",
    //         });
    //     }

    //     // Check if the page has already loaded
    //     if (document.readyState === 'complete') {
    //         onPageLoad();
    //     } else {
    //         window.addEventListener('load', onPageLoad);
    //         // Remove the event listener when component unmounts
    //         return () => window.removeEventListener('load', onPageLoad);
    //     }
    // }, [])

    useEffect(() => {
        const onContentLoaded = () => {
            setAllLoaded(() => true)
            window.scrollTo({ top: 0, behavior: "instant" })
        }

        window.addEventListener("contentLoaded", onContentLoaded)
        return () => {
            window.removeEventListener("contentLoaded", onContentLoaded)
        }
    }, [])

    useEffect(() => {
        // console.log("TEST")
        document.body.classList.remove("navOpen")
    }, [location])

    return (
        <>
            {!allLoaded && <div className="loaderWrapper">
                <ClipLoader
                    className="loaderWrapper--loader clipLoader" />
            </div>}
            <App />
            {/* {allLoaded && <CanvasBackground/>} */}
        </>
    )
}