import { Modal, Box } from "@mui/material";

export default function BaseModal({ children, open, setOpen }) {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className="flex flex-row justify-center items-center"
        >
            <Box className="w-3/4 lg:w-1/2 h-3/4 lg:h-2/3 bg-white rounded-2xl p-5">
                {children}
            </Box>
        </Modal>
    );
}
