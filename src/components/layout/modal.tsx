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
        <Modal open={open} onClose={handleClose} className="flex justify-center items-center">
            <Box className="w-11/12 xl:w-auto xl:min-w-3/5 xl:max-w-7xl max-h-9/10 h-1/10 xl:h-auto xl:min-h-2/3 bg-white rounded-2xl p-4 xl:p-12 overflow-y-auto">
                {children}
            </Box>
        </Modal>
    );
}
