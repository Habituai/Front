import { useContext } from 'react';
import { HabitsContext } from '../contexts/HabitsContext';

export function useUpdateHabits() {
    return useContext(HabitsContext);
}
