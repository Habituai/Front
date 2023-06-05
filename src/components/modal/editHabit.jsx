import EditHabitForm from "../form/editHabit";
import BaseModal from "../layout/modal";

export default function EditHabitModal({ habit, setHabit }) {
    return (
        <BaseModal open={!!habit} setOpen={setHabit}>
            <EditHabitForm habitId={habit} setHabitIdToBeUpdated={setHabit} />
        </BaseModal>
    );
}
