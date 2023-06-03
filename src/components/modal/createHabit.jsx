import CreateHabitForm from "../form/createHabit";
import BaseModal from "../layout/modal";

export default function CreateHabitModal({ openModal, setOpenModal }) {
    return (
        <BaseModal open={openModal} setOpen={setOpenModal}>
            <CreateHabitForm setOpenCreateHabitModal={setOpenModal} />
        </BaseModal>
    );
}
