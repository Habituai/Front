import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import { addDays, subDays } from 'date-fns';
import Hamburger from 'hamburger-react';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import checkBoxIcon from '../../assets/images/checkbox.svg';
import { useUpdateHabits } from '../../hooks/useUpdateHabits';
import LevelCard from '../card/level';
import WeekSelectorCard from '../card/week';
import ExperienceCard from '../card/xp';
import BadHabitToggle from '../input/badHabit';
import UserMenu from '../input/user';

interface DashboardHeaderProps {
    name: string;
    experience: number;
    weekDaysList: string[];
    setOpenCreateHabitModal: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenEditUserModal: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenHabitDumpModal: React.Dispatch<React.SetStateAction<boolean>>;
    referenceDay: Date;
    setReferenceDay: React.Dispatch<React.SetStateAction<Date>>;
    isBadHabitsVisible: boolean;
    setIsBadHabitsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DashboardHeader({
    name,
    experience,
    weekDaysList,
    setOpenCreateHabitModal,
    setOpenEditUserModal,
    setOpenHabitDumpModal,
    referenceDay,
    setReferenceDay,
    isBadHabitsVisible,
    setIsBadHabitsVisible,
}: DashboardHeaderProps) {
    const { setHabitsHasUpdate } = useUpdateHabits();

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

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
            <nav className="w-full flex flex-col xl:flex-row items-center justify-between gap-4 xl:gap-0">
                <span className="flex items-center gap-2 text-4xl text-secondaryExtraLight font-bold">
                    <img src={checkBoxIcon} alt="logo" className="w-8 h-8" />
                    Habituaí
                </span>

                <div className="flex justify-end items-center gap-6 text-white text-xl">
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() => setOpenCreateHabitModal(true)}
                    >
                        CRIAR NOVO HÁBITO
                    </Button>

                    <WeekSelectorCard
                        weekDaysList={weekDaysList}
                        handleAddWeek={handleAddWeek}
                        handleSubWeek={handleSubWeek}
                    />

                    <BadHabitToggle
                        isBadHabitsVisible={isBadHabitsVisible}
                        setIsBadHabitsVisible={setIsBadHabitsVisible}
                    />

                    <ExperienceCard experience={experience} />

                    <LevelCard experience={experience} />

                    <UserMenu
                        name={name}
                        setOpenEditUserModal={setOpenEditUserModal}
                        setOpenHabitDumpModal={setOpenHabitDumpModal}
                    />
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
                <AccordionDetails
                    sx={{
                        width: '100%',
                        height: '100vh',
                        marginTop: '-55px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <div className="w-10/12 h-full flex flex-col justify-center items-center gap-6">
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => setOpenCreateHabitModal(true)}
                            className="w-full"
                        >
                            CRIAR NOVO HÁBITO
                        </Button>

                        <WeekSelectorCard
                            weekDaysList={weekDaysList}
                            handleAddWeek={handleAddWeek}
                            handleSubWeek={handleSubWeek}
                        />

                        <BadHabitToggle
                            isBadHabitsVisible={isBadHabitsVisible}
                            setIsBadHabitsVisible={setIsBadHabitsVisible}
                        />

                        <div className="mt-8 w-full flex justify-center items-center gap-4">
                            <ExperienceCard experience={experience} />

                            <LevelCard experience={experience} />
                        </div>

                        <div className="flex justify-end items-center text-white text-xl">
                            <UserMenu
                                name={name}
                                setOpenEditUserModal={setOpenEditUserModal}
                                setOpenHabitDumpModal={setOpenHabitDumpModal}
                            />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
