import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArticleIcon from '@mui/icons-material/Article';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import { Accordion, AccordionDetails, AccordionSummary, Button, Menu, MenuItem } from '@mui/material';
import { addDays, format, parseISO, subDays } from 'date-fns';
import Hamburger from 'hamburger-react';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import checkBoxIcon from '../../assets/images/checkbox.svg';
import { useUpdateHabits } from '../../hooks/useUpdateHabits';
import { paths } from '../../paths';
import LevelCard from '../card/level';

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

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(event.currentTarget);

    const handleCloseMenu = () => setAnchorEl(null);

    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = paths.home;
    };

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

    return !isMobile ? (
        <header className="w-full py-4 xl:px-9 flex justify-center bg-primaryDark shadow-xl">
            <nav className="w-full flex flex-col xl:flex-row items-center gap-4 xl:gap-0">
                <span className="flex flex-1 items-center gap-2 text-4xl text-secondaryExtraLight font-bold">
                    <img src={checkBoxIcon} alt="logo" className="w-8 h-8" />
                    Habituaí
                </span>

                <div className="flex flex-none justify-center items-center gap-8">
                    <div className="flex items-center justify-center gap-2 text-white py-2 px-4 bg-primaryExtraLight rounded-xl shadow-md">
                        <button onClick={handleSubWeek}>
                            <ArrowCircleLeftIcon
                                color="bom"
                                fontSize="large"
                                className="cursor-pointer drop-shadow-sm hover:text-secondaryMedium hover:transition-all"
                            />
                        </button>

                        <span className="text-md xl:text-lg">
                            {`${format(parseISO(weekDaysList[0]), 'dd/MM')} - ${format(
                                parseISO(weekDaysList[weekDaysList.length - 1]),
                                'dd/MM',
                            )}`}
                        </span>

                        <button onClick={handleAddWeek}>
                            <ArrowCircleRightIcon
                                color="bom"
                                fontSize="large"
                                className="cursor-pointer drop-shadow-sm hover:text-secondaryMedium hover:transition-all"
                            />
                        </button>
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

                <div className="flex flex-1 justify-end items-center gap-6 text-white text-xl">
                    <span className="py-2 px-4 text-sm xl:text-xl bg-primaryExtraLight text-white rounded-lg shadow-md">
                        {`${experience} `}
                        <span className="text-secondaryExtraLight font-bold">xp</span>
                    </span>

                    <LevelCard experience={experience} />

                    <button onClick={handleOpenMenu} className="flex items-center font-bold text-lg xl:text-2xl gap-2">
                        <AccountCircleIcon />
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
            </nav>
        </header>
    ) : (
        <div className="fixed w-full z-50">
            <Accordion
                disableGutters
                square
                sx={{ background: '#002782' }}
                expanded={isAccordionOpen}
                onChange={() => setIsAccordionOpen(!isAccordionOpen)}
            >
                <AccordionSummary
                    sx={{ width: '100%' }}
                    expandIcon={<Hamburger color="#12b52f" toggled={isAccordionOpen} toggle={setIsAccordionOpen} />}
                >
                    <span className="flex items-center gap-2 text-4xl text-secondaryExtraLight font-bold">
                        <img src={checkBoxIcon} alt="logo" className="w-8 h-8" />
                        Habituaí
                    </span>
                </AccordionSummary>
                <AccordionDetails sx={{ height: '100vh', marginTop: '-55px' }}>
                    <div className="w-full h-full flex flex-col justify-center items-center gap-6">
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => setOpenCreateHabitModal(true)}
                            className="w-full"
                        >
                            CRIAR NOVO HÁBITO
                        </Button>

                        <div className="w-full flex items-center justify-between gap-2 text-white py-2 px-4 bg-primaryExtraLight rounded-xl shadow-md">
                            <button onClick={handleSubWeek}>
                                <ArrowCircleLeftIcon
                                    color="bom"
                                    fontSize="large"
                                    className="cursor-pointer drop-shadow-sm hover:text-secondaryMedium hover:transition-all"
                                />
                            </button>

                            <span className="text-xl">
                                {`${format(parseISO(weekDaysList[0]), 'dd/MM')} - ${format(
                                    parseISO(weekDaysList[weekDaysList.length - 1]),
                                    'dd/MM',
                                )}`}
                            </span>

                            <button onClick={handleAddWeek}>
                                <ArrowCircleRightIcon
                                    color="bom"
                                    fontSize="large"
                                    className="cursor-pointer drop-shadow-sm hover:text-secondaryMedium hover:transition-all"
                                />
                            </button>
                        </div>

                        <div className="mt-16 w-full flex justify-center items-center gap-4">
                            <span className="py-2 px-4 text-2xl bg-primaryExtraLight text-white rounded-lg shadow-md">
                                {`${experience} `}
                                <span className="text-secondaryExtraLight font-bold">xp</span>
                            </span>

                            <LevelCard experience={experience} />
                        </div>

                        <div className="flex justify-end items-center text-white text-xl">
                            <button onClick={handleOpenMenu} className="flex items-center font-bold text-4xl gap-2">
                                <AccountCircleIcon fontSize="large" />
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
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
