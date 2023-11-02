import HabitDumpGrid from '../grid/habitDump';
import BaseModal from '../layout/modal';

interface HabitDumpModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HabitDumpModal({ openModal, setOpenModal }: HabitDumpModalProps) {
    return (
        <BaseModal open={!!openModal} setOpen={setOpenModal}>
            <HabitDumpGrid setOpenHabitDumpModal={setOpenModal} />
        </BaseModal>
    );
}
