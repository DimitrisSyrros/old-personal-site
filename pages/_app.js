import {ThemeProvider, StyleSheetManager} from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import {lightTheme, darkTheme, GlobalStyle} from "../styles/Globals"
import {useEffect, useState} from "react";
import useDarkMode from "../hooks/useDarkMode";
import Loader from "./Loader";

// Keep styled-components v5 behaviour: don't pass custom styling props to DOM elements
const shouldForwardProp = (propName, target) =>
    typeof target === "string" ? isPropValid(propName) : true;

function MyApp({Component, pageProps}) {
    const darkMode = useDarkMode(true);
    const theme = darkMode.value ? darkTheme : lightTheme
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(()=>{
            setLoading(false)
        },2600)
    }, []);

    return <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            {loading ? <Loader/> : <Component {...pageProps}/>}
        </ThemeProvider>
    </StyleSheetManager>
}

export default MyApp
