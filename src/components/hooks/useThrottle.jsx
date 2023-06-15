import { useRef } from "react";

function useThrottle(cb, limit) {
    const lastRun = useRef(Date.now());

    return function () {
        if (Date.now() - lastRun.current >= limit) {
            cb();
            lastRun.current = Date.now();
        }
    };
}

export default useThrottle;