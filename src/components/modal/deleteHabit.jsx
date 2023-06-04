import { Button } from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useUpdateHabits } from "../../hooks/useUpdateHabits";
import { makeRequestWithAuthorization } from "../../services/makeRequest";
import BaseModal from "../layout/modal";

export default function DeleteHabitModal({ openModal, setOpenModal }) {
    const { setHabitsHasUpdate } = useUpdateHabits();
    const { id, name } = openModal;
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteHabit = async () => {
        setIsLoading(true);
        try {
            const habitsHost = import.meta.env.VITE_HABITS_PATH;
            await makeRequestWithAuthorization("DELETE", `${habitsHost}/${id}`);
            setOpenModal(false);
            toast.success("Hábito excluído com sucesso!");
            setHabitsHasUpdate(true);
        } catch (error) {
            toast.error("Não foi possível excluir o hábito");
            console.error(`Não foi possível deletar o hábito ${name}`);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BaseModal open={!!openModal} setOpen={setOpenModal}>
            <div className="w-full h-full flex flex-col gap-24 justify-center items-center">
                <div className="text-3xl lg:text-5xl leading-relaxed font-bold text-center">
                    <h1>
                        Tem certeza que deseja excluir permanentemente o hábito
                    </h1>
                    <h1>
                        "<span className="text-primaryDark">{name}</span>"?
                    </h1>
                </div>

                <div className="w-full mt-8 flex lg:gap-10 gap-4 lg:flex-row flex-col">
                    <Button
                        variant="contained"
                        color="ruim"
                        disabled={isLoading}
                        sx={{ width: "100%" }}
                        size="large"
                        onClick={handleDeleteHabit}
                    >
                        Excluir
                    </Button>

                    <Button
                        variant="outlined"
                        disabled={isLoading}
                        sx={{ width: "100%" }}
                        size="large"
                        onClick={() => setOpenModal(false)}
                    >
                        Voltar
                    </Button>
                </div>
            </div>
        </BaseModal>
    );
}
