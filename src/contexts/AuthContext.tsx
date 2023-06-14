import Cookies from 'js-cookie';
import { ReactElement, createContext, useState } from 'react';

export const AuthContext = createContext({
    auth: false,
    setAuth: (() => false) as React.Dispatch<React.SetStateAction<boolean>>,
});

function AuthProvider({ children }: { children: ReactElement }) {
    const token = Cookies.get('token');

    const [auth, setAuth] = useState(!!token);

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
