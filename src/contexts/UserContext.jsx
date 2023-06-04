import { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [userHasUpdate, setUserHasUpdate] = useState(false);

    return (
        <UserContext.Provider value={{ userHasUpdate, setUserHasUpdate }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
