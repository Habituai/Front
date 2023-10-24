import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { envs } from '../../config';
import { useUpdateHabits } from '../../hooks/useUpdateHabits';
import { Habit } from '../../pages/Dashboard';
import { makeRequestWithAuthorization } from '../../services/makeRequestWithAuthorization';
import BaseModal from '../layout/modal';

interface DeleteHabitModalProps {
    habitId: number | null;
    setHabitIdToBeDeleted: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function DeleteHabitModal({ habitId, setHabitIdToBeDeleted }: DeleteHabitModalProps) {
    const { setHabitsHasUpdate } = useUpdateHabits();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [habitData, setHabitData] = useState<Habit | null>(null);

    useEffect(() => {
        if (habitId) {
            const handleGetHabitByIdData = async () => {
                const habitHost = envs.habitPath;
                const data = await makeRequestWithAuthorization('GET', `${habitHost}/${habitId}`);

                setHabitData(data.habit as Habit);
            };

            handleGetHabitByIdData().catch((error) => {
                console.error(error);
                console.error('Não foi possível pegar os dados do hábito.');
            });
        }
    }, [habitId]);

    const handleDeleteHabit = async () => {
        setIsLoading(true);
        try {
            const habitsHost = envs.habitPath;
            await makeRequestWithAuthorization('DELETE', `${habitsHost}/${habitId}`);
            setHabitIdToBeDeleted(null);
            toast.success('Hábito excluído com sucesso!');
            setHabitsHasUpdate(true);
        } catch (error) {
            toast.error('Não foi possível excluir o hábito');
            console.error(`Não foi possível deletar o hábito ${habitData?.name}`);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BaseModal open={!!habitId} setOpen={setHabitIdToBeDeleted}>
            <div className="w-full h-full flex flex-col gap-8 xl:gap-24 justify-center items-center">
                <div className="text-3xl xl:text-5xl leading-relaxed font-bold text-center">
                    <h1>Tem certeza que deseja excluir permanentemente o hábito</h1>
                    <h1>
                        "<span className="text-primaryDark">{habitData?.name}</span>"?
                    </h1>
                </div>

                <div className="w-full flex xl:gap-10 gap-4 xl:flex-row flex-col">
                    <Button
                        variant="contained"
                        color="ruim"
                        disabled={isLoading}
                        sx={{ width: '100%' }}
                        size="large"
                        onClick={handleDeleteHabit}
                    >
                        Excluir
                    </Button>

                    <Button
                        variant="outlined"
                        disabled={isLoading}
                        sx={{ width: '100%' }}
                        size="large"
                        onClick={() => setHabitIdToBeDeleted(null)}
                    >
                        Voltar
                    </Button>
                </div>
            </div>
        </BaseModal>
    );
}
