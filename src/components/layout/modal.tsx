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
            <Box className="min-w-11/12 xl:min-w-3/5 min-h-9/10 xl:min-h-2/3 bg-white rounded-2xl p-4 xl:p-12">
                {children}
            </Box>
        </Modal>
    );
}
