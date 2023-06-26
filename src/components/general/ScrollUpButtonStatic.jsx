export default function ScrollUpButtonStatic() {
    return <button className="scrollUpButtonStatic"
        onClick={() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }}
    >
        <svg
            className="scrollUpButtonStatic--svg"
            width="24"
            height="37"
            viewBox="0 0 24 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10.9393 36.5607C11.5251 37.1464 12.4749 37.1464 13.0607 36.5607L22.6066 27.0147C23.1924 26.4289 23.1924 25.4792 22.6066 24.8934C22.0208 24.3076 21.0711 24.3076 20.4853 24.8934L12 33.3787L3.51472 24.8934C2.92893 24.3076 1.97918 24.3076 1.3934 24.8934C0.80761 25.4792 0.80761 26.4289 1.3934 27.0147L10.9393 36.5607ZM10.5 0.5L10.5 35.5L13.5 35.5L13.5 0.5L10.5 0.5Z" fill="black" />
        </svg>
    </button>
}