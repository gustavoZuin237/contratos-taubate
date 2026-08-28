import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box
    }

    *:focus {
        border: 0;
        outline: 0;
    }

    /* Firefox */
    * {
        scrollbar-width: thin;
        scrollbar-color: #1f3c88 #d3d3d3;
    }

    /* Chromium / Webkit */
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #d3d3d3;
        border-radius: 999px;
    }

    ::-webkit-scrollbar-thumb {
        background: #1f3c88;
        border-radius: 999px;
        border: 2px solid #d3d3d3;
        transition: background 0.2s ease;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #3251a1;
    }

    ::-webkit-scrollbar-corner {
        background: #d3d3d3;
    }

    body, input, button {
        -webkit-font-smoothing: antialiased;
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    p, h1, h2, h3, h4, h5, h6 {
        color: ${(props) => props.theme["text"]};
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
    }

    h1 {
        @media (max-width: 550px) {      
            font-size: 1.8rem;
            text-align: center;
            margin-bottom: 2rem;
        }

        @media (max-width: 500px) {      
            font-size: 1.6rem;
            text-align: center;
            margin-bottom: 2rem;
        }
    }

    *,
    *::before,
    *::after {
        transition:
        background-color 0.3s ease,
        color 0.3s ease,
        border-color 0.3s ease,
        fill 0.3s ease,
        stroke 0.3s ease;
    }
`;
