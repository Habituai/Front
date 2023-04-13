import "./styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./hooks/useAuth";

function App() {
    const { auth } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={auth ? <Dashboard /> : <Home />}
                />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
