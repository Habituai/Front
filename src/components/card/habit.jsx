import DeleteIcon from "@mui/icons-material/Delete";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import EditIcon from "@mui/icons-material/Edit";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WeekendIcon from "@mui/icons-material/Weekend";
import { Checkbox, IconButton, Menu, MenuItem } from "@mui/material";
import { isToday, parseISO } from "date-fns";
import { useState } from "react";
import { useUpdateHabits } from "../../hooks/useUpdateHabits";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { makeRequestWithAuthorization } from "../../services/makeRequest";

export default function HabitCard({
    id,
    name,
    classification,
    category,
    date,
    weekDay,
    concluded,
    setHabitToBeDeleted,
    setHabitIdToBeUpdated,
}) {
    const host = import.meta.env.VITE_PROGRESS_PATH;

    const { description: categoryDescription } = category;

    const { setUserHasUpdate } = useUpdateUser();
    const { setHabitsHasUpdate } = useUpdateHabits();

    const [isLoading, setIsLoading] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const handleDeleteHabit = () => {
        setHabitToBeDeleted({ id, name });
        handleCloseMenu();
    };

    const handleUpdatedHabit = () => {
        setHabitIdToBeUpdated(id);
        handleCloseMenu();
    };

    const styleMap = () => {
        if (classification === "ruim") return "border-red-600";

        const categories = {
            saude: "border-green-700",
            educacao: "border-purple-900",
            lazer: "border-blue-700",
        };

        return categories[categoryDescription] || "border-gray-800";
    };

    const handleIcon = () => {
        if (classification === "ruim")
            return <DoDisturbAltIcon fontSize="small" color={classification} />;

        const categories = {
            saude: (
                <HealthAndSafetyIcon
                    fontSize="small"
                    color={categoryDescription}
                />
            ),
            educacao: (
                <MenuBookIcon fontSize="small" color={categoryDescription} />
            ),
            lazer: <WeekendIcon fontSize="small" color={categoryDescription} />,
        };

        return categories[categoryDescription] || null;
    };

    const handleCheck = async () => {
        const data = { habit: { id }, dayWeek: weekDay };
        await makeRequestWithAuthorization("POST", host, { data });
    };

    const handleUncheck = async () => {
        await makeRequestWithAuthorization("DELETE", `${host}/${id}`);
    };

    const changeCheckbox = async () => {
        setIsLoading(true);
        try {
            if (concluded) {
                await handleUncheck();
            } else {
                await handleCheck();
            }

            setIsLoading(false);
            setUserHasUpdate(true);
            setHabitsHasUpdate(true);
        } catch (error) {
            console.error(`Erro ao alterar checkbox "${name}"`);
        }
    };

    return (
        <div
            className={`w-full rounded-lg p-2 border-2 bg-white shadow-md ${styleMap(
                categoryDescription
            )} `}
        >
            <div className="flex items-center justify-between gap-1">
                <div className="flex items-center">
                    <Checkbox
                        defaultChecked={concluded}
                        disabled={!isToday(parseISO(date)) || isLoading}
                        size="small"
                        onChange={changeCheckbox}
                        color={
                            classification === "ruim"
                                ? classification
                                : categoryDescription
                        }
                    />
                    <span className="text-sm">{name}</span>
                </div>

                <div className="flex items-center">
                    {handleIcon()}

                    <IconButton onClick={handleOpenMenu} size="small">
                        <MoreVertIcon fontSize="small" className="text-black" />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem
                            onClick={handleUpdatedHabit}
                            className="flex items-center gap-2"
                        >
                            <EditIcon />
                            Atualizar
                        </MenuItem>
                        <MenuItem
                            onClick={handleDeleteHabit}
                            className="flex items-center gap-2"
                        >
                            <DeleteIcon />
                            Excluir
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
}
