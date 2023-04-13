import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    //consultar cookies e validar autenticidade
    const token = sessionStorage.getItem("token");

    const haveValidCookies = !!token;
    const [auth, setAuth] = useState(haveValidCookies);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
