import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";

const theme = createTheme({
    palette: {
        primary: {
            main: "#183695",
        },
        good: {
            main: "#0ca31f",
        },
        bad: {
            main: "#ff0000",
        },
        health: {
            main: "#007d00",
        },
        study: {
            main: "purple",
        },
        other: {
            main: "#222",
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </AuthProvider>
    </React.StrictMode>
);
