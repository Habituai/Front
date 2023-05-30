import { Box, Modal } from "@mui/material";

export default function BaseModal({ children, open, setOpen }) {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className="flex flex-row justify-center items-center"
        >
            <Box className="w-3/4 lg:w-3/5 h-9/10 lg:h-2/3 bg-white rounded-2xl p-4 lg:p-12">
                {children}
            </Box>
        </Modal>
    );
}
