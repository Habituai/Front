import { Box, Modal } from '@mui/material';
import { ReactElement } from 'react';

interface BaseModalProps {
    children: ReactElement;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<any>>;
}

export default function BaseModal({ children, open, setOpen }: BaseModalProps) {
    const handleClose = () => setOpen(null);

    return (
        <Modal open={open} onClose={handleClose} className="flex flex-row justify-center items-center">
            <Box className="w-11/12 lg:w-3/5 h-9/10 lg:h-2/3 bg-white rounded-2xl p-4 lg:p-12">{children}</Box>
        </Modal>
    );
}
