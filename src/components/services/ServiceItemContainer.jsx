import ServiceItem from "./ServiceItem"
import ClipLoader from "react-spinners/ClipLoader"
import { useRef } from "react"
import { useEffect } from "react"

export default function ServiceItemContainer({ serviceData, lan, signalFunc = () => { } }) {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return
        if (!serviceData) return

        /** @type{HTMLElement} */
        const containerEle = containerRef.current

        const columns = 2
        const rows = serviceData.length
        containerEle.style.gridTemplateRows = `repeat(${rows}, auto)`
        // console.log(`columns:${columns}\nrows:${rows}`)

        /*
        Assign to grid like
            0   1
        0   0   X
        1   X   1
        2   2   X
        3   X   3
        4   4   X
        leftIndex: 0,2,4,...
        rightIndex: 1,3,5, ...
        */

        let leftIndex = 0
        let rightIndex = 1
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                if (x === 0 && y % 2 === 0) {
                    // console.log(containerEle.childNodes[index].textContent + "[LEFT]")
                    containerEle.childNodes[leftIndex].style.gridColumn = "1"
                    containerEle.childNodes[leftIndex].style.gridRow = y + 1
                    leftIndex += 2
                }
                else if (x === 1 && y % 2 !== 0) {
                    // console.log(containerEle.childNodes[index].textContent + "[RIGHT]")
                    containerEle.childNodes[rightIndex].style.gridColumn = "2"
                    containerEle.childNodes[rightIndex].style.gridRow = y + 1
                    rightIndex += 2
                }
            }
        }

        const onResizeEvent = () => {
            signalFunc(getComputedStyle(containerEle).height.slice(0, -2))
        }
        onResizeEvent()

        const onServiceItemVisibleEvent = (e) => {
            for (let i = 0; i < containerEle.childNodes.length; i++) {
                if (e.detail.activated.includes(i)) {
                    containerEle.childNodes[i].firstChild.classList.add("isActive")
                } else {
                    containerEle.childNodes[i].firstChild.classList.remove("isActive")
                }
            }
        }

        window.addEventListener("resize", onResizeEvent)
        // window.addEventListener("popstate", onResizeEvent)
        window.addEventListener("serviceItemVisible", onServiceItemVisibleEvent)

        return () => {
            window.removeEventListener("resize", onResizeEvent)
            // window.removeEventListener("popstate", onResizeEvent)
            window.removeEventListener("serviceItemVisible", onServiceItemVisibleEvent)
        }
    }, [containerRef, serviceData])


    return serviceData ?
        <div className="service--itemContainer" ref={containerRef}>
            {serviceData.map((serviceItemData, i) => {
                return <ServiceItem
                    key={i}
                    serviceItemData={serviceItemData.serviceItem}
                    lan={lan}
                    index={i}
                />
            })}
        </div>
        : <ClipLoader />
}