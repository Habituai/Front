import { ReactElement, createContext, useState } from 'react';

export const UserContext = createContext({
    userHasUpdate: false,
    setUserHasUpdate: (() => false) as React.Dispatch<React.SetStateAction<boolean>>,
});

function UserProvider({ children }: { children: ReactElement }) {
    const [userHasUpdate, setUserHasUpdate] = useState(false);

    return <UserContext.Provider value={{ userHasUpdate, setUserHasUpdate }}>{children}</UserContext.Provider>;
}

export default UserProvider;
