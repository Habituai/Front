import { createContext, useState } from "react";

export const HabitsContext = createContext();

function HabitsProvider({ children }) {
    const [habitsHasUpdate, setHabitsHasUpdate] = useState(false);

    return (
        <HabitsContext.Provider value={{ habitsHasUpdate, setHabitsHasUpdate }}>
            {children}
        </HabitsContext.Provider>
    );
}

export default HabitsProvider;
