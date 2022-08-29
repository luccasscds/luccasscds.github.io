import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
    * {
        padding: 0;
        border: 0;
        margin: 0;
        box-sizing: content-box;
        color: white;
        font-family: sans-serif;
    }

    html {
        height: 100vh;
        background: black;
    }

    body, #root, main {
        height: inherit;
    }
    
    a {text-decoration: none;}
`