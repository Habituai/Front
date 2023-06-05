import { Grid } from "@mui/material";
import { addDays, formatISO, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import HabitCard from "../components/card/habit";
import DashboardHeader from "../components/header/dashboard";
import DayHabitTableLayout from "../components/layout/dayHabitTable";
import CreateHabitModal from "../components/modal/createHabit";
import DeleteHabitModal from "../components/modal/deleteHabit";
import EditHabitModal from "../components/modal/editHabit";
import EditUserModal from "../components/modal/editUser";
import { useAuth } from "../hooks/useAuth";
import { useUpdateHabits } from "../hooks/useUpdateHabits";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { makeRequestWithAuthorization } from "../services/makeRequest";

const getWeekDaysList = (referenceDay) => {
    const firstDayOfWeek = startOfWeek(referenceDay, { weekStartsOn: 1 });

    const list = [];
    list.push(firstDayOfWeek);

    for (let i = 1; i <= 6; i++) {
        list.push(addDays(firstDayOfWeek, i));
    }

    return list.map((day) => formatISO(day));
};

function Dashboard() {
    const userHost = import.meta.env.VITE_USER_AUTHENTICATION_PATH;
    const habitsHost = import.meta.env.VITE_HABIT_WEEK_PATH;
    const { token } = useAuth();

    const { habitsHasUpdate, setHabitsHasUpdate } = useUpdateHabits();
    const { userHasUpdate, setUserHasUpdate } = useUpdateUser();

    const weekDaysBaseList = getWeekDaysList(new Date());
    const [weekDaysList, setWeekDaysList] = useState(weekDaysBaseList);

    const [userData, setUserData] = useState({
        id: -1,
        name: "",
        email: "",
        xp: 0,
    });
    const [habitList, setHabitList] = useState([]);

    const [openCreateHabitModal, setOpenCreateHabitModal] = useState(false);
    const [openEditUserModal, setOpenEditUserModal] = useState(false);
    const [habitIdToBeUpdated, setHabitIdToBeUpdated] = useState(false);
    const [habitToBeDeleted, setHabitToBeDeleted] = useState(false);

    const handleGetUserData = async () => {
        const data = await makeRequestWithAuthorization("POST", userHost, {
            data: { token },
        });
        setUserData(data);
    };

    const handleGetHabitsData = async () => {
        const data = await makeRequestWithAuthorization("POST", habitsHost, {
            data: weekDaysList,
        });
        setHabitList(data.dayList);
    };

    useEffect(() => {
        handleGetUserData().catch((error) => {
            console.log(error);
            console.error("Não foi possível pegar os dados do usuário.");
        });

        handleGetHabitsData().catch((error) => {
            console.error(error);
            console.error("Erro em buscar os hábitos");
        });
    }, []);

    useEffect(() => {
        if (userHasUpdate) {
            handleGetUserData().catch((error) => {
                console.log(error);
                console.error("Não foi possível pegar os dados do usuário.");
            });

            setUserHasUpdate(false);
        }
    }, [userHasUpdate]);

    useEffect(() => {
        if (habitsHasUpdate) {
            handleGetHabitsData().catch((error) => {
                console.error(error);
                console.error("Erro em buscar os hábitos");
            });

            setHabitsHasUpdate(false);
        }
    }, [habitsHasUpdate]);

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />

            <EditUserModal
                openModal={openEditUserModal}
                setOpenModal={setOpenEditUserModal}
                userData={userData}
            />
            <CreateHabitModal
                openModal={openCreateHabitModal}
                setOpenModal={setOpenCreateHabitModal}
            />
            <EditHabitModal
                habit={habitIdToBeUpdated}
                setHabit={setHabitIdToBeUpdated}
            />
            <DeleteHabitModal
                habit={habitToBeDeleted}
                setHabit={setHabitToBeDeleted}
            />

            <DashboardHeader
                name={userData.name}
                xp={userData.xp}
                weekDaysList={weekDaysList}
                setOpenCreateHabitModal={setOpenCreateHabitModal}
                setOpenEditUserModal={setOpenEditUserModal}
            />

            <div className="w-full pt-8 pb-6 flex justify-center">
                <h1 className="flex-none text-5xl font-bold text-primaryDark">
                    Semana de Hábitos
                </h1>
            </div>

            <div className="w-full h-full pt-4 px-3">
                <Grid
                    container
                    className="w-full h-full flex flex-wrap justify-end items-start"
                >
                    {weekDaysList?.length > 0 &&
                        !!habitList &&
                        weekDaysList.map((date, index) => {
                            const habits =
                                habitList.find(
                                    (dayHabit) =>
                                        dayHabit.date === date.split("T")[0]
                                )?.habit ?? [];

                            return (
                                <DayHabitTableLayout key={date} date={date}>
                                    {habits?.length > 0
                                        ? habits?.map(
                                              ({
                                                  id,
                                                  name,
                                                  category,
                                                  classification,
                                                  weightExperience,
                                                  conclusionDate,
                                              }) => (
                                                  <HabitCard
                                                      key={id}
                                                      id={id}
                                                      name={name}
                                                      category={category}
                                                      classification={
                                                          classification
                                                      }
                                                      date={date}
                                                      weightExperience={
                                                          weightExperience
                                                      }
                                                      conclusionDate={
                                                          conclusionDate
                                                      }
                                                      weekDay={index + 1}
                                                      setHabitToBeDeleted={
                                                          setHabitToBeDeleted
                                                      }
                                                      setHabitIdToBeUpdated={
                                                          setHabitIdToBeUpdated
                                                      }
                                                  />
                                              )
                                          )
                                        : "Não há nada neste dia!"}
                                </DayHabitTableLayout>
                            );
                        })}
                </Grid>
            </div>
        </>
    );
}

export default Dashboard;
