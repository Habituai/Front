import CreateHabitForm from '../form/createHabit';
import BaseModal from '../layout/modal';

interface CreateHabitModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateHabitModal({ openModal, setOpenModal }: CreateHabitModalProps) {
    return (
        <BaseModal open={openModal} setOpen={setOpenModal}>
            <CreateHabitForm setOpenCreateHabitModal={setOpenModal} />
        </BaseModal>
    );
}
