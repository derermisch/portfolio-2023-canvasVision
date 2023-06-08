// currentLightMode is either "light" or "dark"
export const getCurrentLightMode = () => {
    // If there is a lightMode stored, return it
    let currentLightMode = localStorage.getItem('currentLightMode');
    if (currentLightMode) return currentLightMode

    // If not use light mode (this could be changed to using system preferences)
    currentLightMode = "light"
    localStorage.setItem("currentLightMode", currentLightMode)
    return currentLightMode
}

// This function is for initialisation, called in App useEffect
export const setCurrentLightMode = () => {
    document.body.classList.add(getCurrentLightMode())
}

export const getCurrentLightModeInputstate = () => {
    return (getCurrentLightMode() === "light") ? true : false
}

export const toggleCurrentLightMode = () => {
    const currentLightMode = localStorage.getItem("currentLightMode")
    const oppositeLightMode = (currentLightMode === "light") ? "dark" : "light"

    if (document.body.classList.contains(currentLightMode)) {
        document.body.classList.remove(currentLightMode)
        document.body.classList.add(oppositeLightMode)
    }
    localStorage.setItem("currentLightMode", oppositeLightMode)
}

export const hex2rgba = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
};