import React from "react";
import { useState, useEffect } from "react";
import sanityClient from "../../client"

// const dataFetchEvent = new CustomEvent("dataFetched")

export const getServerData = (url, log = false) => async () => {
    log && console.log("Fetching from: ", url)
    const response = await sanityClient.fetch(url)
    // console.log(url, response)
    log && console.log(response)
    // window.dispatchEvent(dataFetchEvent)
    return response;
}

export const DataSource = ({ getDataFunc = () => { }, resourceName, children }) => {
    const [state, setState] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await getDataFunc();
            setState(data);
        })();
    }, [getDataFunc]);

    return (
        <>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { [resourceName]: state });
                }

                return child;
            })}
        </>
    );
}