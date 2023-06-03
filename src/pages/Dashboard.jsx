import { Grid } from "@mui/material";
import { addDays, formatISO, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import HabitCard from "../components/card/habit";
import DashboardHeader from "../components/header/dashboard";
import DayHabitTableLayout from "../components/layout/dayHabitTable";
import CreateHabitModal from "../components/modal/createHabit";
import DeleteHabitModal from "../components/modal/deleteHabit";
import EditUserModal from "../components/modal/editUser";
import { useAuth } from "../hooks/useAuth";
import {
    makeRequest,
    makeRequestWithAuthorization,
} from "../services/makeRequest";

const getWeekDaysList = (referenceDay) => {
    const firstDayOfWeek = startOfWeek(referenceDay, { weekStartsOn: 1 });

    const list = [];
    list.push(firstDayOfWeek);

    for (let i = 1; i <= 6; i++) {
        list.push(addDays(firstDayOfWeek, i));
    }

    //TODO: arrumar as datas no mock
    return list.map((day) => formatISO(day).split("-03:00")[0]);
};

function Dashboard() {
    const userHost = import.meta.env.VITE_USER_AUTHENTICATION_PATH;
    const habitsHost = import.meta.env.VITE_HABITS_PATH;
    const { token } = useAuth();

    const weekDaysBaseList = getWeekDaysList(new Date());
    const [weekDaysList, setWeekDaysList] = useState(weekDaysBaseList);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        xp: 0,
    });
    const [habitList, setHabitList] = useState([]);

    const [openCreateHabitModal, setOpenCreateHabitModal] = useState(false);
    const [openEditUserModal, setOpenEditUserModal] = useState(false);
    const [habitToBeDeleted, setHabitToBeDeleted] = useState(false);

    const handleGetUserData = async () => {
        const data = await makeRequest("POST", userHost, {
            data: { token },
        });
        setUserData(data);
    };

    const getHabitsData = async () => {
        const data = await makeRequestWithAuthorization("GET", habitsHost, {
            data: weekDaysList,
        });
        setHabitList(data.dayList);
    };

    // Sempre buscar os dados do usuário ao entrar e ao atualizar hábitos
    useEffect(() => {
        handleGetUserData().catch((error) => {
            console.log(error);
            console.error("Não foi possível pegar os dados do usuário.");
        });

        getHabitsData().catch((error) => {
            console.error(error);
            console.error("Erro em buscar os hábitos");
        });
    }, []);

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
            <DeleteHabitModal
                openModal={habitToBeDeleted}
                setOpenModal={setHabitToBeDeleted}
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

            <div className="w-full h-full pt-4 px-4">
                <Grid
                    container
                    className="w-full h-full flex flex-wrap justify-end items-start"
                >
                    {weekDaysList?.length > 0 &&
                        !!habitList &&
                        weekDaysList.map((date, index) => {
                            const habits =
                                habitList.find(
                                    (dayHabit) => dayHabit.date === date
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
