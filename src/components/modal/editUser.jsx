import EditUserForm from "../form/editUser";
import BaseModal from "../layout/modal";

export default function EditUserModal({ openModal, setOpenModal, userData }) {
    return (
        <BaseModal open={openModal} setOpen={setOpenModal}>
            <EditUserForm
                setOpenEditUserModal={setOpenModal}
                userData={userData}
            />
        </BaseModal>
    );
}
