import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { Menu, MenuItem } from '@mui/material';
import Cookies from 'js-cookie';
import { ReactElement, useState } from 'react';
import { isMobile } from 'react-device-detect';
import toast from 'react-hot-toast';
import { envs } from '../../config';
import { paths } from '../../paths';
import { makeRequestWithAuthorization } from '../../services/makeRequestWithAuthorization';

interface UserMenuProps {
    name: string;
    setOpenEditUserModal: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenHabitDumpModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserMenu({ name, setOpenEditUserModal, setOpenHabitDumpModal }: UserMenuProps) {
    const { reportPath } = envs;

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(event.currentTarget);

    const handleCloseMenu = () => setAnchorEl(null);

    const handleGenerateReport = async () => {
        await toast.promise(makeRequestWithAuthorization('GET', reportPath), {
            loading: 'Enviando...',
            success: <p>Enviado para seu email!</p>,
            error: <p>Não foi possível enviar.</p>,
        });

        handleCloseMenu();
    };

    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = paths.home;
    };

    const handleAccountData = () => {
        setOpenEditUserModal(true);
        handleCloseMenu();
    };

    const handleHabitDumpData = () => {
        setOpenHabitDumpModal(true);
        handleCloseMenu();
    };

    const CustomMenuItem = ({ title, icon, handleFn }: { title: string; icon: ReactElement; handleFn: () => void }) => (
        <MenuItem onClick={handleFn} className="flex items-center gap-2">
            {icon}
            {title}
        </MenuItem>
    );

    return (
        <>
            <button onClick={handleOpenMenu} className="flex items-center font-bold text-4xl xl:text-2xl gap-2">
                <AccountCircleIcon sx={isMobile ? { fontSize: '2rem' } : { fontSize: '1.5rem' }} />
                <div>
                    {name?.toUpperCase()}
                    <ArrowDropDownIcon />
                </div>
            </button>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleCloseMenu}>
                <CustomMenuItem
                    title="Gerar relatório de progresso"
                    icon={<ArticleIcon />}
                    handleFn={handleGenerateReport}
                />
                <CustomMenuItem title="Meus dados" icon={<PersonIcon />} handleFn={handleAccountData} />
                <CustomMenuItem title="Lixeira de hábitos" icon={<DeleteIcon />} handleFn={handleHabitDumpData} />
                <CustomMenuItem title="Sair da conta" icon={<LogoutIcon />} handleFn={handleLogout} />
            </Menu>
        </>
    );
}
