import EditHabitForm from '../form/editHabit';
import BaseModal from '../layout/modal';

interface EditHabitModalProps {
    habitId: number | null;
    setHabitIdToBeUpdated: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function EditHabitModal({ habitId, setHabitIdToBeUpdated }: EditHabitModalProps) {
    return (
        <BaseModal open={!!habitId} setOpen={setHabitIdToBeUpdated}>
            <EditHabitForm habitId={habitId} setHabitIdToBeUpdated={setHabitIdToBeUpdated} />
        </BaseModal>
    );
}
