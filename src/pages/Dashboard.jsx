import { useEffect, useState } from "react";
import makeRequest from "../services/axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const host = import.meta.env.VITE_HABITS_PATH;

    const { auth } = useAuth();
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        if (!auth) {
            navigate("/sign-in");
        }
    }, [auth]);

    useEffect(() => {
        const getHabitsData = async () => {
            const data = await makeRequest("GET", host);
            setHabits(data);
        };

        getHabitsData().catch(() => console.log("erro"));
    }, []);

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            {habits.map((habit) => {
                return <h1 key={habit.id}>{habit.name}</h1>;
            })}
        </div>
    );
}

export default Dashboard;
