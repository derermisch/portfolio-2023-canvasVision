import { useContext, useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"
import { useInView } from "react-intersection-observer"

import { determineTouchScreen } from "../../utils/utils"
import { SettingsContext } from "../general/SettingsContext"

export default function Formular({ dataForForm }) {
    const { ref, inView, entry } = useInView({ threshold: .2 })

    // focus on first input field when in view
    useEffect(() => {
        if (!inView || !entry.target) return

        const field = entry.target
        if (!determineTouchScreen())
            field.focus()
    }, [inView])

    // language
    const { value } = useContext(SettingsContext)

    const navigate = useNavigate()

    const [formData, setFormData] = useState(() => {
        return ({
            name: "",
            email: "",
            nachricht: ""
        })
    })

    const updateFormData = ({ target: { value, name } }) => {
        setFormData(oldFormData => {
            return ({
                ...oldFormData,
                [name]: value
            })
        })
    }

    function encode(data) {
        return Object.keys(data)
            .map(
                (key) =>
                    encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
            )
            .join("&");
    }

    const submitForm = async (e) => {
        e.preventDefault()

        const response = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
                "form-name": e.target.getAttribute("name"),
                ...formData,
            }),
        })
        navigate("/formHandle", { state: { wasOk: response.ok, formData: formData }, replace: true })
        // .catch((error) => navigate("/formHandle"));
    }

    return (
        dataForForm ?
            <form
                data-netlify="true"
                className="contact--form"
                name="contact"
                method="post"
                onSubmit={submitForm}
            >
                <input type="hidden" name="form-name" value="contact" />

                <label className="contact--form--nameLabel" htmlFor="name">{dataForForm.name[value]}</label>
                <input
                    name="name"
                    type="text"
                    className="contact--form--nameField"
                    placeholder="Name*"
                    value={formData.name}
                    onChange={updateFormData}
                    ref={ref}
                    required
                />

                <label className="contact--form--emailLabel" htmlFor="email">{dataForForm.email[value]}</label>
                <input
                    name="email"
                    type="email"
                    className="contact--form--emailField"
                    placeholder="E-Mail Adresse*"
                    value={formData.email}
                    onChange={updateFormData}
                    required
                />

                <label className="contact--form--messageLabel" htmlFor="nachricht">{dataForForm.message[value]}</label>
                <textarea
                    name="nachricht"
                    className="contact--form--messageLabel"
                    placeholder="Nachricht*"
                    onChange={updateFormData}
                    value={formData.nachricht}
                    maxLength="1500"
                    required
                />
                <div className="contact--form--submitContainer">
                    {/* <button className="kontakt--formContainer--form--submitContainer--submitBtn">Abschicken</button> */}
                    <p className="contact--form--submitContainer--text">
                        {dataForForm.lawText[value]}
                    </p>
                    <button className="contact--form--submitContainer--submitBtn" type="submit">
                        <p className="contact--form--submitContainer--submitBtn--text">{dataForForm.sendMessage[value]}</p>
                        <p className="contact--form--submitContainer--submitBtn--symbol">✉️</p>
                    </button>
                </div>
            </form>
            : <ClipLoader />
    )
}