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
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { makeRequestWithAuthorization } from "../../services/makeRequest";

export default function HabitCard({
    id,
    name,
    classification,
    category,
    date,
    conclusionDate = "",
    weekDay,
    setHabitToBeDeleted,
}) {
    const habitsHost = import.meta.env.VITE_HABITS_PATH;

    const { setUserHasUpdate } = useUpdateUser();

    const [isLoading, setIsLoading] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const handleDeleteHabit = () => {
        setHabitToBeDeleted({ id, name });
        handleCloseMenu();
    };

    const styleMap = () => {
        if (classification === "ruim") return "border-red-600";

        const categories = {
            saude: "border-green-700",
            estudo: "border-purple-900",
            lazer: "border-blue-700",
        };

        return categories[category] || "border-gray-800";
    };

    const handleIcon = () => {
        if (classification === "ruim")
            return <DoDisturbAltIcon color={classification} />;

        const categories = {
            saude: <HealthAndSafetyIcon color={category} />,
            estudo: <MenuBookIcon color={category} />,
            lazer: <WeekendIcon color={category} />,
        };

        return categories[category] || null;
    };

    const handleUpdateCheck = async () => {
        const data = { id, weekDay, date };

        await makeRequestWithAuthorization("POST", `${habitsHost}/${id}`, {
            data,
        });
    };

    const changeCheckbox = async () => {
        setIsLoading(true);
        try {
            await handleUpdateCheck();
            setIsLoading(false);
            setUserHasUpdate(true);
        } catch (error) {
            console.error(`Erro ao alterar checkbox "${name}"`);
            changeCheckbox();
        }
    };

    return (
        <div
            className={`w-full rounded-lg p-2 border-2 bg-white shadow-md ${styleMap(
                category
            )} `}
        >
            <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                    <Checkbox
                        defaultChecked={!!conclusionDate}
                        disabled={!isToday(parseISO(date)) || isLoading}
                        size="medium"
                        onChange={changeCheckbox}
                        color={
                            classification === "ruim"
                                ? classification
                                : category
                        }
                    />
                    <span>{name}</span>
                </div>

                <div className="flex items-center gap-1">
                    {handleIcon()}

                    <IconButton onClick={handleOpenMenu} size="small">
                        <MoreVertIcon className="text-black" />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem
                            onClick={handleCloseMenu}
                            className="flex items-center gap-2"
                        >
                            <EditIcon />
                            Editar
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
