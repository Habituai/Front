import { useEffect, useState } from "react";
import makeRequest from "../services/axios";
import { Button, Grid, IconButton, Checkbox } from "@mui/material";
import Cookies from "js-cookie";
import HabitCard from "../components/habitCard";
import DayHabitTableLayout from "../components/layout/dayHabitTable";

function Dashboard() {
    const host = import.meta.env.VITE_HABITS_PATH;

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

    const handleLogout = () => {
        Cookies.remove("token");
        window.location.href = "/";
    };

    return (
        <>
            <header className="w-full py-5 flex justify-center">
                <nav className="w-3/4 flex justify-between items-center">
                    <span className="text-6xl text-blue-900 font-bold">
                        Habituaí
                    </span>
                    <div className="flex justify-between items-center gap-8">
                        <Button
                            type="button"
                            variant="contained"
                            onClick={handleLogout}
                        >
                            Deslogar
                        </Button>
                    </div>
                </nav>
            </header>
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
