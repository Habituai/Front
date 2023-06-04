import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";
import HabitsProvider from "./contexts/HabitsContext";
import UserProvider from "./contexts/UserContext";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
    palette: {
        primary: createColor("#183695"),
        secondary: createColor("#069010"),
        bom: createColor("#0ca31f"),
        ruim: createColor("#ff0000"),
        saude: createColor("#007d00"),
        estudo: createColor("#430054"),
        outro: createColor("#222"),
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <HabitsProvider>
                <UserProvider>
                    <ThemeProvider theme={theme}>
                        <App />
                    </ThemeProvider>
                </UserProvider>
            </HabitsProvider>
        </AuthProvider>
    </React.StrictMode>
);
