import { useEffect, useState } from "react";
import makeRequest from "../services/axios";
import { Button, Grid } from "@mui/material";
import HabitCard from "../components/habitCard";
import DayHabitTableLayout from "../components/layout/dayHabitTable";
import DashboardHeader from "../components/header/dashboard";
import BaseModal from "../components/layout/modal";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function Dashboard() {
    const host = import.meta.env.VITE_HABITS_PATH;

    const [openCreateHabitModal, setOpenCreateHabitModal] = useState(false);

    const getJSDate = (date) => new Date(date + "T00:00");

    function formatFullDate(date) {
        const jsDate = getJSDate(date);
        const fullDate = new Intl.DateTimeFormat("pt-br", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        return fullDate.format(jsDate);
    }

    const formatWeekDayDate = (date) => {
        const jsDate = getJSDate(date);
        const weekDay = new Intl.DateTimeFormat("pt-br", { weekday: "short" });
        return weekDay.format(jsDate);
    };

    const [habits, setHabits] = useState([]);
    console.log(habits);

    useEffect(() => {
        //ajustar lógica no duturo de acordo com o contrato com o back
        function groupByDate(data) {
            const result = [];
            const habits = [];

            data.forEach((habit) => {
                const index = habits.indexOf(habit.date);
                if (index === -1) {
                    habits.push(habit.date);
                    result.push({
                        date: habit.date,
                        habits: [habit],
                    });
                } else {
                    result[index].habits.push(habit);
                }
            });

            return result;
        }

        const getHabitsData = async () => {
            const data = await makeRequest("GET", host);
            setHabits(groupByDate(data));
        };

        getHabitsData().catch(() => console.log("erro"));
    }, []);

    return (
        <>
            <BaseModal
                open={openCreateHabitModal}
                setOpen={setOpenCreateHabitModal}
            >
                <div>
                    <h2>Criar novo hábito</h2>
                </div>
            </BaseModal>
            <DashboardHeader name="Sleepy Joe" xp={123} />
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
                        {`24/04 - 30/04`}
                        <ArrowCircleRightIcon color="primary" />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Grid container className="bg-white flex gap-5">
                    {habits.map(({ date, habits }) => (
                        <DayHabitTableLayout
                            key={date}
                            date={formatFullDate(date)}
                            dateName={formatWeekDayDate(date)}
                        >
                            {habits.map(
                                ({ id, name, done, category, type }) => (
                                    <HabitCard
                                        key={id}
                                        title={name}
                                        done={done}
                                        category={category}
                                        type={type}
                                        date={date}
                                    />
                                )
                            )}
                        </DayHabitTableLayout>
                    ))}
                </Grid>
            </div>
        </>
    );
}

export default Dashboard;
