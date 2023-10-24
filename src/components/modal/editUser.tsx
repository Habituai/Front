import { User } from '../../pages/Dashboard';
import EditUserForm from '../form/editUser';
import BaseModal from '../layout/modal';

interface EditUserModal {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    userData: User;
}

export default function EditUserModal({ openModal, setOpenModal, userData }: EditUserModal) {
    return (
        <BaseModal open={!!openModal} setOpen={setOpenModal}>
            <EditUserForm setOpenEditUserModal={setOpenModal} userData={userData} />
        </BaseModal>
    );
}
