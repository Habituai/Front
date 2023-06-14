import { ReactElement, createContext, useState } from 'react';

export const HabitsContext = createContext({
    habitsHasUpdate: false,
    setHabitsHasUpdate: (() => false) as React.Dispatch<React.SetStateAction<boolean>>,
});

function HabitsProvider({ children }: { children: ReactElement }) {
    const [habitsHasUpdate, setHabitsHasUpdate] = useState(false);

    return <HabitsContext.Provider value={{ habitsHasUpdate, setHabitsHasUpdate }}>{children}</HabitsContext.Provider>;
}

export default HabitsProvider;
