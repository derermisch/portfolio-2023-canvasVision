// currentLanguage is either 0 or 1
// 0 is german, 1 is english. This way it can be used as an index directly.
// if language starts with "de", choose 0, else choose 1
export const getCurrentLanguage = () => {
    // If there is a language stored, return it
    let currentLanguage = localStorage.getItem('currentLanguage');
    if (currentLanguage) return parseInt(currentLanguage, 10)

    // If not figure the language out, save it and return it
    currentLanguage = (window.navigator.language.slice(0, 2) === "de") ? 0 : 1
    localStorage.setItem("currentLanguage", currentLanguage.toString())
    return currentLanguage
}

export const getCurrentLanguageInputstate = () => {
    return (getCurrentLanguage() === 0) ? true : false
}

export const toggleLanguage = () => {
    let currentLanguage = parseInt(localStorage.getItem("currentLanguage"), 10)
    currentLanguage = (currentLanguage === 0) ? 1 : 0
    localStorage.setItem("currentLanguage", currentLanguage.toString())
}
