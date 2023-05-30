import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Button, Grid } from "@mui/material";
import { addDays, format, parseISO, startOfWeek } from "date-fns";
import pt from "date-fns/locale/pt";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import CreateHabitForm from "../components/form/createHabit";
import HabitCard from "../components/habitCard";
import DashboardHeader from "../components/header/dashboard";
import DayHabitTableLayout from "../components/layout/dayHabitTable";
import BaseModal from "../components/layout/modal";
import { makeRequestWithAuthorization } from "../services/makeRequest";

const getWeekDaysList = (today) => {
    const firstDayOfWeek = startOfWeek(today, { weekStartsOn: 1 });

    const list = [];
    list.push(firstDayOfWeek);

    for (let i = 1; i <= 6; i++) {
        list.push(addDays(firstDayOfWeek, i));
    }

    return list.map((day) => format(day, "yyyy-MM-dd"));
};

function Dashboard() {
    const host = import.meta.env.VITE_HABITS_PATH;

    const weekDaysBaseList = getWeekDaysList(new Date());
    const [weekDaysList, setWeekDaysList] = useState(weekDaysBaseList);

    const [userData, setUserData] = useState({ name: "Bruno", xp: 123 });
    const [habitList, setHabitList] = useState([]);

    const [openCreateHabitModal, setOpenCreateHabitModal] = useState(false);

    //Sempre buscar os dados do usuário ao entrar
    useEffect(() => {
        // const handleGetUserData = async () => {
        //     const host = import.meta.env.VITE_USER_AUTHENTICATION_PATH;
        //     const response = await makeRequest("POST", host, {
        //         data: { token },
        //     });
        //     console.log(response.data);
        //     setUserData(response.data);
        // };
        // handleGetUserData().catch((error) => {
        //     console.log(error);
        //     console.error("Não foi possível pegar os dados do usuário.");
        // });
    }, []);

    useEffect(() => {
        const getHabitsData = async () => {
            const data = await makeRequestWithAuthorization("GET", host);

            setHabitList(data);
        };

        getHabitsData().catch((error) => {
            console.error(error);
            console.error("Erro em buscar os hábitos");
        });
    }, []);

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />

            <BaseModal
                open={openCreateHabitModal}
                setOpen={setOpenCreateHabitModal}
            >
                <CreateHabitForm
                    setOpenCreateHabitModal={setOpenCreateHabitModal}
                />
            </BaseModal>

            <DashboardHeader name={userData.name} xp={userData.xp} />

            <div className="w-full py-5 flex justify-center">
                <div className="w-3/4 flex justify-between items-center">
                    <Button
                        variant="contained"
                        onClick={() => setOpenCreateHabitModal(true)}
                    >
                        CRIAR NOVO HÁBITO
                    </Button>
                    <div className="flex items-center justify-center gap-2">
                        <ArrowCircleLeftIcon color="primary" />
                        {`${format(
                            parseISO(weekDaysList[0]),
                            "dd/MM"
                        )} - ${format(
                            parseISO(weekDaysList[weekDaysList.length - 1]),
                            "dd/MM"
                        )}`}
                        <ArrowCircleRightIcon color="primary" />
                    </div>
                </div>
            </div>

            <div className="w-full pt-12 px-4">
                <Grid
                    container
                    className="flex flex-wrap justify-end items-start"
                >
                    {weekDaysList?.length > 0 &&
                        !!habitList &&
                        weekDaysList.map((date) => {
                            const habits = habitList[date];
                            return (
                                <DayHabitTableLayout
                                    key={date}
                                    date={format(parseISO(date), "dd/MM/yyyy")}
                                    dateName={format(parseISO(date), "EEE", {
                                        locale: pt,
                                    })}
                                >
                                    {habits?.length > 0
                                        ? habits?.map(
                                              ({
                                                  id,
                                                  name,
                                                  done,
                                                  category,
                                                  classification,
                                                  weightExperience,
                                                  conclusionDate,
                                              }) => (
                                                  <HabitCard
                                                      key={id}
                                                      id={id}
                                                      title={name}
                                                      done={done}
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
