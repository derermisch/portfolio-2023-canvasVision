import ClipLoader from "react-spinners/ClipLoader"

export default function HeadingContainer({ heading, lan }) {
    return (
        heading ?
            <h1 className="home--headingContainer--heading">{heading[lan]}</h1>
            : <ClipLoader />
    )
} 