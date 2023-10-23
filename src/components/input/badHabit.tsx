import { Checkbox } from '@mui/material';

interface BadHabitToggleProps {
    isBadHabitsVisible: boolean;
    setIsBadHabitsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BadHabitToggle({ isBadHabitsVisible, setIsBadHabitsVisible }: BadHabitToggleProps) {
    const handleChangeToggle = () => setIsBadHabitsVisible(!isBadHabitsVisible);

    return (
        <div className="w-full xl:w-auto py-1 px-4 bg-primaryExtraLight text-white text-xl rounded-lg shadow-md flex justify-center items-center">
            <Checkbox checked={isBadHabitsVisible} size="medium" onChange={handleChangeToggle} color="bom" />
            <span className="pr-2">Ver hábitos ruins</span>
        </div>
    );
}
