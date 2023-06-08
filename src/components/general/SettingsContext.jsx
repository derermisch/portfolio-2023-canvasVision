import { createContext } from "react";

export const SettingsContext = createContext({
    lan: "EN",
    colorMode: "light"
})