import { useEffect, useState } from "react";
import makeRequest from "../services/axios";
import { Button } from "@mui/material";

function Dashboard() {
    const host = import.meta.env.VITE_HABITS_PATH;

    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const getHabitsData = async () => {
            const data = await makeRequest("GET", host);
            setHabits(data);
        };

        getHabitsData().catch(() => console.log("erro"));
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <Button type="button" variant="contained" onClick={handleLogout}>
                Deslogar
            </Button>
            {habits.map((habit) => {
                return <h1 key={habit.id}>{habit.name}</h1>;
            })}
        </div>
    );
}

export default Dashboard;
