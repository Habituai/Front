import { Grid } from '@mui/material';
import { addDays, formatISO, startOfWeek } from 'date-fns';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import HabitCard from '../components/card/habit';
import DashboardHeader from '../components/header/dashboard';
import DayHabitTableLayout from '../components/layout/dayHabitTable';
import CreateHabitModal from '../components/modal/createHabit';
import DeleteHabitModal from '../components/modal/deleteHabit';
import EditHabitModal from '../components/modal/editHabit';
import EditUserModal from '../components/modal/editUser';
import { envs } from '../config';
import { useUpdateHabits } from '../hooks/useUpdateHabits';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { makeRequestWithAuthorization } from '../services/makeRequestWithAuthorization';

const getWeekDaysList = (referenceDay: Date) => {
    const firstDayOfWeek = startOfWeek(referenceDay, { weekStartsOn: 1 });

    const list = [];
    list.push(firstDayOfWeek);

    for (let i = 1; i <= 6; i++) {
        list.push(addDays(firstDayOfWeek, i));
    }

    return list.map((day) => formatISO(day));
};

export interface User {
    id: number;
    name: string;
    email: string;
    experience: number;
}

export interface HabitCategory {
    id: number;
    description: 'saude' | 'educacao' | 'lazer' | 'outro';
}

export interface Habit {
    id: number;
    name: string;
    category: HabitCategory;
    classification: 'bom' | 'ruim';
    weightExperience: 5 | 10 | 15 | 20 | 25;
    dateCreation: number;
    status: boolean;
    streak: number;
}

interface ListHabit {
    habit: Habit;
    concluded: false;
}

interface DayList {
    date: string;
    listHabit: ListHabit[];
    listBadHabit: ListHabit[];
}

function Dashboard() {
    const userHost = envs.userAccountPath;
    const habitsHost = envs.habitWeekPath;

    const { habitsHasUpdate, setHabitsHasUpdate } = useUpdateHabits();
    const { userHasUpdate, setUserHasUpdate } = useUpdateUser();

    const [referenceDay, setReferenceDay] = useState(new Date());
    const weekDaysList = getWeekDaysList(referenceDay);

    const [userData, setUserData] = useState<User>({ id: -1, name: '', email: '', experience: 0 });
    const [habitListFromServer, setHabitListFromServer] = useState<DayList[]>([]);

    const [isBadHabitsVisible, setIsBadHabitsVisible] = useState(false);
    const [openCreateHabitModal, setOpenCreateHabitModal] = useState<boolean>(false);
    const [openEditUserModal, setOpenEditUserModal] = useState(false);
    const [habitIdToBeUpdated, setHabitIdToBeUpdated] = useState<number | null>(null);
    const [habitIdToBeDeleted, setHabitIdToBeDeleted] = useState<number | null>(null);

    const handleGetUserData = async () => {
        const data = await makeRequestWithAuthorization('GET', userHost);
        setUserData(data);
    };

    const handleGetHabitsData = async () => {
        const data = await makeRequestWithAuthorization('POST', habitsHost, {
            data: weekDaysList,
        });

        const habits: DayList[] = data.dayList.map((day: DayList) => ({
            date: day.date,
            listHabit: day.listHabit.filter((habit: ListHabit) => habit.habit.classification === 'bom'),
            listBadHabit: day.listHabit.filter((habit: ListHabit) => habit.habit.classification !== 'bom'),
        }));

        setHabitListFromServer(habits);
    };

    const renderHabitCards = (habitData: ListHabit[], date: string, index: number) =>
        habitData?.map(({ habit, concluded }) => (
            <HabitCard
                key={habit.id}
                id={habit.id}
                name={habit.name}
                category={habit.category}
                classification={habit.classification}
                date={date}
                weekDay={index + 1}
                concluded={concluded}
                setHabitIdToBeDeleted={setHabitIdToBeDeleted}
                setHabitIdToBeUpdated={setHabitIdToBeUpdated}
            />
        ));

    const showAllHabits = weekDaysList.map((date, index) => {
        const dayGoodHabits =
            habitListFromServer.find((dayHabit) => dayHabit.date === date.split('T')[0])?.listHabit ?? [];

        const dayBadHabits =
            habitListFromServer.find((dayHabit) => dayHabit.date === date.split('T')[0])?.listBadHabit ?? [];

        return (
            <DayHabitTableLayout key={date} date={date}>
                <>
                    {dayGoodHabits?.length > 0 ? (
                        renderHabitCards(dayGoodHabits, date, index)
                    ) : (
                        <span>Não há nada neste dia!</span>
                    )}
                </>
                <>
                    {isBadHabitsVisible && dayBadHabits.length > 0 ? (
                        <>
                            <div className="w-full bg-red-600 h-1 rounded-full mt-2" />
                            {renderHabitCards(dayBadHabits, date, index)}
                        </>
                    ) : (
                        ''
                    )}
                </>
            </DayHabitTableLayout>
        );
    });

    useEffect(() => {
        handleGetUserData().catch((error) => {
            console.error(error);
            console.error('Não foi possível pegar os dados do usuário.');
        });

        handleGetHabitsData().catch((error) => {
            console.error(error);
            console.error('Erro em buscar os hábitos');
        });
    }, []);

    useEffect(() => {
        if (userHasUpdate) {
            handleGetUserData().catch((error) => {
                console.error(error);
                console.error('Não foi possível pegar os dados do usuário.');
            });

            setUserHasUpdate(false);
        }
    }, [userHasUpdate]);

    useEffect(() => {
        if (habitsHasUpdate) {
            handleGetHabitsData().catch((error) => {
                console.error(error);
                console.error('Erro em buscar os hábitos');
            });

            setHabitsHasUpdate(false);
        }
    }, [habitsHasUpdate]);

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <EditUserModal openModal={openEditUserModal} setOpenModal={setOpenEditUserModal} userData={userData} />
            <CreateHabitModal openModal={openCreateHabitModal} setOpenModal={setOpenCreateHabitModal} />
            <EditHabitModal habitId={habitIdToBeUpdated} setHabitIdToBeUpdated={setHabitIdToBeUpdated} />
            <DeleteHabitModal habitId={habitIdToBeDeleted} setHabitIdToBeDeleted={setHabitIdToBeDeleted} />

            <DashboardHeader
                name={userData.name}
                experience={userData.experience}
                weekDaysList={weekDaysList}
                setOpenCreateHabitModal={setOpenCreateHabitModal}
                setOpenEditUserModal={setOpenEditUserModal}
                referenceDay={referenceDay}
                setReferenceDay={setReferenceDay}
                isBadHabitsVisible={isBadHabitsVisible}
                setIsBadHabitsVisible={setIsBadHabitsVisible}
            />

            <div className="w-full pt-20 xl:pt-8 xl:pb-6 flex justify-center">
                <h1 className="flex-none text-4xl xl:text-5xl font-bold text-primaryDark">Semana de Hábitos</h1>
            </div>

            <Grid container className="w-full h-full pt-4 flex flex-wrap items-start">
                {!!habitListFromServer && showAllHabits}
            </Grid>
        </>
    );
}

export default Dashboard;
