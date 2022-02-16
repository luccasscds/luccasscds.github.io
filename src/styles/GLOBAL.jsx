import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
    * {
        padding: 0;
        border: 0;
        margin: 0;
        box-sizing: content-box;
        background-color: black;
        color: white;
        font-family: sans-serif;
    }
    
    a {text-decoration: none;}
`