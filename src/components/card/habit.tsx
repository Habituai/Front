import DeleteIcon from '@mui/icons-material/Delete';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import EditIcon from '@mui/icons-material/Edit';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WeekendIcon from '@mui/icons-material/Weekend';
import { Checkbox, IconButton, Menu, MenuItem } from '@mui/material';
import { isToday, parseISO } from 'date-fns';
import { ReactElement, useState } from 'react';
import toast from 'react-hot-toast';
import fireIcon from '../../assets/icons/fire.png';
import { envs } from '../../config';
import { useUpdateHabits } from '../../hooks/useUpdateHabits';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { HabitCategory } from '../../pages/Dashboard';
import { makeRequestWithAuthorization } from '../../services/makeRequestWithAuthorization';

type Color = 'saude' | 'educacao' | 'lazer' | 'ruim' | 'outro';

interface StyleAttributes {
    color: Color;
    border: string;
    icon: ReactElement | null;
}

interface HabitCardProps {
    id: number;
    name: string;
    classification: 'bom' | 'ruim';
    category: HabitCategory;
    date: string;
    weekDay: number;
    concluded: boolean;
    streak: number;
    setHabitIdToBeDeleted: React.Dispatch<React.SetStateAction<number | null>>;
    setHabitIdToBeUpdated: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function HabitCard({
    id,
    name,
    classification,
    category,
    date,
    weekDay,
    concluded,
    streak,
    setHabitIdToBeDeleted,
    setHabitIdToBeUpdated,
}: HabitCardProps) {
    const host = envs.progressPath;

    const { description: categoryDescription } = category;

    const { setUserHasUpdate } = useUpdateUser();
    const { setHabitsHasUpdate } = useUpdateHabits();

    const [isLoading, setIsLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const today = isToday(parseISO(date));

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const handleDeleteHabit = () => {
        setHabitIdToBeDeleted(id);
        handleCloseMenu();
    };

    const handleUpdatedHabit = () => {
        setHabitIdToBeUpdated(id);
        handleCloseMenu();
    };

    const mapStyleAttributes = (): StyleAttributes => {
        const styleKey = classification === 'ruim' ? classification : categoryDescription;

        const styles = {
            saude: (): StyleAttributes => ({
                color: 'saude',
                border: 'border-green-700',
                icon: <HealthAndSafetyIcon fontSize="small" color={categoryDescription} />,
            }),
            educacao: (): StyleAttributes => ({
                color: 'educacao',
                border: 'border-purple-900',
                icon: <MenuBookIcon fontSize="small" color={categoryDescription} />,
            }),
            lazer: (): StyleAttributes => ({
                color: 'lazer',
                border: 'border-blue-700',
                icon: <WeekendIcon fontSize="small" color={categoryDescription} />,
            }),
            ruim: (): StyleAttributes => ({
                color: 'ruim',
                border: 'border-red-600',
                icon: <DoDisturbAltIcon fontSize="small" color={classification} />,
            }),
            outro: (): StyleAttributes => ({
                color: 'outro',
                border: 'border-gray-800',
                icon: null,
            }),
        };

        return styles[styleKey]();
    };

    const handleCheck = async () => {
        const data = { habit: { id }, dayWeek: weekDay };
        try {
            await makeRequestWithAuthorization('POST', host, { data });
        } catch {
            toast.error('Não foi possível marcar este hábito.');
            console.error('Não é possível marcar como concluido.');
        }
    };

    const handleUncheck = async () => {
        try {
            await makeRequestWithAuthorization('DELETE', `${host}/${id}`);
        } catch {
            toast.error('Não foi possível desmarcar este hábito.');
            console.error('Não é possível desmarcar como concluido.');
        }
    };

    const changeCheckbox = async () => {
        setIsLoading(true);
        try {
            concluded ? await handleUncheck() : await handleCheck();

            setUserHasUpdate(true);
            setHabitsHasUpdate(true);
        } catch (error) {
            console.error(`Erro ao alterar checkbox "${name}"`);
        } finally {
            setIsLoading(false);
        }
    };

    const renderStreak =
        today && concluded && streak >= 2 && classification === 'bom' ? (
            <div className="absolute bottom-3/4 left-[-7px]">
                <div className="relative">
                    <img src={fireIcon} alt="fire icon" className="h-[27px]" />
                    <span className="absolute top-1/3 left-1/3 text-sm font-bold font-sans ">{streak}</span>
                </div>
            </div>
        ) : null;

    return (
        <div className={`relative w-full rounded-lg p-2 border-2 bg-white shadow-md ${mapStyleAttributes().border}`}>
            {renderStreak}

            <div className="flex items-center justify-between gap-1">
                <div className="flex items-center">
                    <Checkbox
                        checked={concluded}
                        disabled={!today || isLoading}
                        size="small"
                        onChange={changeCheckbox}
                        color={mapStyleAttributes().color}
                    />
                    <span className="text-sm">{name}</span>
                </div>

                <div className="flex items-center">
                    {mapStyleAttributes().icon}

                    <IconButton onClick={handleOpenMenu} size="small">
                        <MoreVertIcon fontSize="small" className="text-black" />
                    </IconButton>

                    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleCloseMenu}>
                        <MenuItem onClick={handleUpdatedHabit} className="flex items-center gap-2">
                            <EditIcon />
                            Atualizar
                        </MenuItem>
                        <MenuItem onClick={handleDeleteHabit} className="flex items-center gap-2">
                            <DeleteIcon />
                            Excluir
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
}
