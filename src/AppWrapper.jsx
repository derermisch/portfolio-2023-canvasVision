import { useState, useEffect } from "react"
import { ClipLoader } from "react-spinners"
import { useLocation } from "react-router-dom"

import sanityClient from "./client"
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
    return builder.image(source)
}

import App from "./App"

export default function AppWrapper() {
    const [allLoaded, setAllLoaded] = useState(() => false)
    const location = useLocation().pathname

    useEffect(() => {
        const onContentLoaded = () => {
            setAllLoaded(() => true)
            window.scrollTo({ top: 0, behavior: "instant" })
        }

        window.addEventListener("contentLoaded", onContentLoaded)
        return () => {
            window.removeEventListener("contentLoaded", onContentLoaded)
        }
    }, [location])

    useEffect(() => {
        document.body.classList.remove("navOpen")
    }, [location])

    /*
        This use Effect runs whenever data is fetched.
        This ensures that elements are always available
        to set the background on them.
        Note: This will cause redundant calls and is not an optimal solution,
        but ensures that there is always a background set on each ".site" element
     */
    useEffect(() => {
        const onDataFetched = () => {
            (async () => {
                // if (!sitesRef.current) return
                const response = await sanityClient.fetch('*[_type == "other"][0]{backgroundImages[]{"imgUrl": asset->url}}')
                if (!response) return

                const sites = document.querySelectorAll(".site")
                let selection = response.backgroundImages
                const original = [...selection]

                for (let i = 0; i < sites.length; i++) {
                    if (selection.length <= 0) {
                        selection = original
                    }
                    sites[i].style.backgroundImage = `url(${urlFor(selection.shift().imgUrl).url()})`
                }
            })();
        }

        window.addEventListener("dataFetched", onDataFetched)
        return () => {
            window.removeEventListener("dataFetched", onDataFetched)
        }
    }, [])

    return (
        <>
            {!allLoaded && <div className="loaderWrapper">
                <ClipLoader
                    className="loaderWrapper--loader clipLoader" />
            </div>}
            <App />
        </>
    )
}