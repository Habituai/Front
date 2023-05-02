import { createContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const token = Cookies.get("token");

    const [auth, setAuth] = useState(!!token);

    return (
        <AuthContext.Provider value={{ auth, setAuth, token }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
