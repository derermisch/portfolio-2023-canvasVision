// Device information
// 
//
export const determineIfMobile = () => {
    return (window.innerWidth <= 500) ? true : false
}

export const determineTouchScreen = () => {
    return window.matchMedia("(pointer: coarse)").matches
}

// Content loaded?
// Doesn't show page as long initial content isn't loaded
//
let timerId = null
const contentLoadedEvent = new CustomEvent("contentLoaded")
let contentLoaded = false
dispatchEvent(contentLoadedEvent)

const startTimer = () => {
    timerId = setTimeout(() => {
        // console.log("Content loaded!");
        dispatchEvent(contentLoadedEvent)
        contentLoaded = true
        previousHeight = innerHeight //to have an inital value
        previousWidth = innerWidth
    }, 100); //loading site of website is 100ms min.
}

const cancelTimer = () => {
    clearTimeout(timerId)
}

const onDataFetched = () => {
    if (contentLoaded) return //Just use for starting content
    if (timerId)
        cancelTimer()
    startTimer()
}

window.removeEventListener("dataFetched", onDataFetched)
window.addEventListener("dataFetched", onDataFetched)

// Resize event "override"
// Catches resize event to check if "real" resize event should be fired.
// This is necessary, because some mobile browsers trigger resize on scroll (because of navigation bar)
let previousWidth = null
let previousHeight = null
const customResizeEvent = new CustomEvent("customResize")
const setCurrentAndResize = (newHeight = 0, newWidth = 0) => {
    // console.log(`setting new dimensions: ${newHeight} ${newWidth}`)
    previousHeight = newHeight
    previousWidth = newWidth
    dispatchEvent(customResizeEvent)
}
const determineIfResize = (e) => {
    const currentHeight = e.target.innerHeight
    const currentWidth = e.target.innerWidth
    // console.log(previousWidth, currentWidth)
    if (currentHeight !== previousHeight && currentWidth !== previousWidth) {
        // console.log(currentHeight, currentWidth)
        setCurrentAndResize(currentHeight, currentWidth)
        return
    }
    // console.log(previousHeight, currentHeight)
    if (currentHeight !== previousHeight) {
        // console.log(`Previous height is ${previousHeight}; Current Height is ${currentHeight}`)
        const heightDifference = currentHeight - previousHeight
        // console.log(`Height difference is ${heightDifference}`)
        const urlBarRange = currentHeight * 0.1
        // console.log("range is", urlBarRange)
        if (heightDifference <= urlBarRange && heightDifference > 0) {
            // console.log("is in range. should not resize")
            return
        }
    }
    if (currentHeight === previousHeight && currentWidth === previousWidth) {
        return
    }
    setCurrentAndResize(currentHeight, currentWidth)
}
window.removeEventListener("resize", determineIfResize)
window.addEventListener("resize", determineIfResize)

// export let isMobile = determineIfMobile()

// window.addEventListener("resize", () => {
//     determineIfMobile()
// })

// window.addEventListener("load", () => {
//     determineIfMobile()
// })

export function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export function throttle(cb, delay = 250) {
    let shouldWait = false

    return (...args) => {
        if (shouldWait) return

        cb(...args)
        shouldWait = true
        setTimeout(() => {
            shouldWait = false
        }, delay)
    }
}

// TODO; find a more elegant way to do this..
export const scrollToLocation = (locationIndex, onClickFunction = null) => {
    document.body.classList.remove("navOpen")
    let goalEle = null
    switch (locationIndex) {
        case 0: {
            goalEle = document.querySelector(".home")
            break;
        }
        case 1: {
            goalEle = document.querySelector(".projects")
            break;
        }
        case 2: {
            goalEle = document.querySelector(".aboutMe")
            break;
        }
        case 3: {
            goalEle = document.querySelector(".contact")
            break;
        }
    }
    if (!goalEle) return
    goalEle.scrollIntoView({ behavior: "smooth" });

    onClickFunction && onClickFunction()
    // const navBar = document.querySelector(".welcome--navHamburger")
    // navBar.click() // closes menu on mobile
}

export const prepareNavLinkArray = (navlinkData, lan) => {
    if (!navlinkData || (lan !== 1 && lan !== 0)) return
    const tmp = []
    let index = 0
    for (let i = 0; i < navlinkData.length; i++) {
        if (navlinkData[i].link) {
            tmp.push({
                index: navlinkData.length,
                navLink: navlinkData[i].navlink[lan],
                link: navlinkData[i].link
            })
        } else {
            tmp.push({
                index: index++,
                navLink: navlinkData[i].navlink[lan],
                link: null
            })
        }
    }
    return tmp
}

export function getImageUrl(name) {
    return new URL(`../images/${name}.png`, import.meta.url).href
}

export async function waitForImgagesToLoad() {
    await Promise.all(Array.from(document.images).map(img => {
        if (img.complete)
            return Promise.resolve(img.naturalHeight !== 0);
        return new Promise(resolve => {
            img.addEventListener('load', () => resolve(true));
            img.addEventListener('error', () => resolve(false));
        });
    }))
}