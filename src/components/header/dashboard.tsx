import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArticleIcon from '@mui/icons-material/Article';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import { Button, Menu, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, subDays } from 'date-fns';
import Cookies from 'js-cookie';
import { useState } from 'react';
import userImage from '../../assets/images/user.png';
import { useUpdateHabits } from '../../hooks/useUpdateHabits';
import { paths } from '../../paths';

interface DashboardHeaderProps {
    name: string;
    experience: number;
    weekDaysList: string[];
    setOpenCreateHabitModal: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenEditUserModal: React.Dispatch<React.SetStateAction<boolean>>;
    referenceDay: Date;
    setReferenceDay: React.Dispatch<React.SetStateAction<Date>>;
}

export default function DashboardHeader({
    name,
    experience,
    weekDaysList,
    setOpenCreateHabitModal,
    setOpenEditUserModal,
    referenceDay,
    setReferenceDay,
}: DashboardHeaderProps) {
    const { setHabitsHasUpdate } = useUpdateHabits();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const [value, setValue] = useState<Date>();

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(event.currentTarget);

    const handleCloseMenu = () => setAnchorEl(null);

    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = paths.home;
    };

    const getLevelByXP = () => (experience > 0 ? Math.ceil(experience / 100) : 1);

    const handleAccountData = () => {
        setOpenEditUserModal(true);
        handleCloseMenu();
    };

    const handleSubWeek = () => {
        const newReferenceDay = subDays(referenceDay, 7);
        setReferenceDay(newReferenceDay);
        setHabitsHasUpdate(true);
    };

    const handleAddWeek = () => {
        const newReferenceDay = addDays(referenceDay, 7);
        setReferenceDay(newReferenceDay);
        setHabitsHasUpdate(true);
    };

    return (
        <div className="fixed h-screen max-w-1/5 flex flex-col justify-center bg-primaryDark shadow-xl">
            <div className="flex flex-col justify-center items-center gap-8">
                <div className="flex items-center justify-center gap-2 text-white py-2 px-4 bg-primaryExtraLight rounded-xl shadow-md">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker label="Dia" value={value} onChange={(newValue: Date) => setValue(newValue)} />
                    </LocalizationProvider>
                </div>

                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => setOpenCreateHabitModal(true)}
                >
                    CRIAR NOVO HÁBITO
                </Button>
            </div>

            <div className="flex flex-col justify-end items-center gap-6 text-white text-xl">
                <span className="py-2 px-4 text-sm lg:text-xl bg-primaryExtraLight text-white rounded-lg shadow-md">
                    {`${experience} `}
                    <span className="text-secondaryExtraLight font-bold">xp</span>
                </span>
                <span className="py-2 px-4 text-sm lg:text-xl bg-primaryExtraLight text-white rounded-lg shadow-md">
                    {`Nível ${getLevelByXP()}`}
                </span>
                <button
                    onClick={handleOpenMenu}
                    className="flex flex-col items-center font-bold text-lg lg:text-2xl gap-2"
                >
                    <img src={userImage} className="rounded-full" />
                    <div>
                        {name.toUpperCase()}
                        <ArrowDropDownIcon />
                    </div>
                </button>
                <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleCloseMenu}>
                    <MenuItem onClick={handleCloseMenu} className="flex items-center gap-2">
                        <ArticleIcon />
                        Gerar relatório de progresso
                    </MenuItem>
                    <MenuItem onClick={handleAccountData} className="flex items-center gap-2">
                        <PersonIcon />
                        Meus dados
                    </MenuItem>
                    <MenuItem onClick={handleLogout} className="flex items-center gap-2">
                        <CancelIcon />
                        Sair da plataforma
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
}
