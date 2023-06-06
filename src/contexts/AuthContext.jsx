import Cookies from "js-cookie";
import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const token = Cookies.get("token");

    const [auth, setAuth] = useState(!!token);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
