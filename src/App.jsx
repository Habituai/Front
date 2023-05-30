import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Error404 from "./pages/404";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./styles/global.css";

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
