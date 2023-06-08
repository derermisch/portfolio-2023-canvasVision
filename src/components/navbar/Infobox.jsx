import { useLayoutEffect, useRef } from "react"
// import BlockContent from "@sanity/block-content-to-react"
import { PortableText } from "@portabletext/react"
import ClipLoader from "react-spinners/ClipLoader"

export default function Infobox({ messageData }) {
    // messageData && console.log(messageData)
    const modalRef = useRef(null)

    useLayoutEffect(() => {
        if (!modalRef.current) return
        modalRef.current.close()
    }, [])

    const showModal = () => {
        if (!modalRef.current) return
        modalRef.current.showModal()
    }

    const closeModal = () => {
        if (!modalRef.current) return
        modalRef.current.close()
        // console.log(modalRef.current)
    }

    const closeModalByClickingBackground = (e) => {
        if (e.target.tagName !== 'DIALOG') //This prevents issues with forms
            return;

        const rect = e.target.getBoundingClientRect();

        const clickedInDialog = (
            rect.top <= e.clientY &&
            e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX &&
            e.clientX <= rect.left + rect.width
        );

        if (clickedInDialog === false)
            e.target.close();
    }

    return (
        messageData ?
            <div className="nav--infoBox">
                <p className="nav--infoBox--text"><strong>Aktuelles: </strong>{messageData.infoMessageShort}</p>
                <button className="nav--infoBox--button" onClick={showModal}>(mehr lesen)</button>
                <dialog className="nav--infoBox--modalDialog" onClick={closeModalByClickingBackground} ref={modalRef}>
                    <div className="nav--infoBox--modalDialog--container">
                        <div className="nav--infoBox--modalDialog--container--text">
                            <PortableText
                                className={"nav--infoBox--modalDialog--container--text"}
                                value={messageData.infoMessageLong}
                            // projectId={import.meta.env.VITE_SANITY_PROJECT_ID}
                            // dataset="production"
                            />
                        </div>
                        <button className="nav--infoBox--modalDialog--container--closeBtn" onClick={closeModal}>Fenster schließen</button>
                    </div>
                </dialog>
            </div>
            : <ClipLoader />
    )
}