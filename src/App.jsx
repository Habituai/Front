import "./styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Error404 from "./pages/404";

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
                {/*404 sempre por último*/}
                <Route path="/*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
