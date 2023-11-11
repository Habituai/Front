import { Button, Tooltip } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import achievement1 from '../../assets/achievements/1.jpg';
import achievement2 from '../../assets/achievements/2.jpg';
import achievement3 from '../../assets/achievements/3.jpg';
import { envs } from '../../config';
import { makeRequestWithAuthorization } from '../../services/makeRequestWithAuthorization';

interface Achievement {
    idAchievement: number;
    description: string;
    name: string;
    conquestDate: string;
}

interface AchievementMuralProps {
    openAchievementMural: boolean;
    setOpenAchievementMural: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AchievementMural({ openAchievementMural, setOpenAchievementMural }: AchievementMuralProps) {
    const { achievementPath } = envs;

    const [achievements, setAchievements] = useState<[Achievement] | []>([]);

    const handleGetHabitsData = async () => {
        const achievements: [Achievement] = await makeRequestWithAuthorization('GET', achievementPath);
        setAchievements(achievements);
    };

    useEffect(() => {
        if (openAchievementMural) {
            handleGetHabitsData().catch((error) => {
                console.error(error);
                console.error('Erro em buscar os hábitos');
            });
        }
    }, [openAchievementMural]);

    const toolTipComponent = (achievement: Achievement) => {
        return (
            <div className="flex flex-col justify-center items-center">
                <h5 className="font-bold text-sm mb-2">{achievement.name}</h5>
                <p>{achievement.description}</p>
                <p>Em {format(new Date(achievement.conquestDate), 'dd/MM/yyyy')}</p>
            </div>
        );
    };

    const achievementImages: any = {
        1: achievement1,
        2: achievement2,
        3: achievement3,
    };

    return (
        <div className="h-full w-full flex justify-center items-center flex-col gap-3 xl:gap-8 p-10">
            <h1 className="w-full mb-4 text-xl xl:text-3xl font-bold text-primaryDark">Mural de conquistas</h1>

            <div className="w-full h-full xl:max-w-[720px] flex flex-wrap justify-center items-center gap-6">
                {achievements.length > 0 ? (
                    achievements.map((achievement) => {
                        return (
                            <Tooltip title={toolTipComponent(achievement)} key={achievement.idAchievement}>
                                <img
                                    src={achievementImages[achievement.idAchievement]}
                                    alt={achievement.description}
                                    className="rounded-full border-4 border-gray-100 w-24 h-24 xl:w-32 xl:h-32 transition-transform shadow-2xl duration-500 ease-in-out transform scale-100 hover:scale-110"
                                />
                            </Tooltip>
                        );
                    })
                ) : (
                    <div className="flex items-center justify-center flex-col">
                        <p>Você ainda não possui conquitas.</p>
                        <p>Continue desbravando o aplicativo!</p>
                    </div>
                )}
            </div>

            <div className="w-full flex justify-end mt-12">
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={() => setOpenAchievementMural(false)}
                    sx={{ width: '40%' }}
                >
                    Voltar
                </Button>
            </div>
        </div>
    );
}
