import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Checkbox, IconButton, Menu, MenuItem } from "@mui/material";
import { isToday, parseISO } from "date-fns";
import { useState } from "react";
import { makeRequestWithAuthorization } from "../../services/makeRequest";

export default function HabitCard({
    id,
    name,
    classification,
    category,
    date,
    conclusionDate = "",
    weekDay,
}) {
    const habitsHost = import.meta.env.VITE_HABITS_PATH;

    const [isLoading, setIsLoading] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const styleMap = (category) => {
        const categories = {
            saude: "border-green-900",
            estudo: "border-purple-900",
            ruim: "border-red-900",
            outro: "border-gray-800",
        };

        return categories[category] || "";
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
        } catch (error) {
            console.error(`Erro ao alterar checkbox "${name}"`);
            changeCheckbox();
        }
    };

    return (
        <div
            className={`w-full rounded-sm p-2 border-2 bg-white ${styleMap(
                category
            )} `}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <Checkbox
                        defaultChecked={!!conclusionDate}
                        disabled={!isToday(parseISO(date)) || isLoading}
                        size="medium"
                        onChange={changeCheckbox}
                        color={classification}
                    />
                    <span>{name}</span>
                </div>

                <div className="flex items-center justify-end gap-1">
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
                            <EditIcon color={category} />
                            Editar
                        </MenuItem>
                        <MenuItem
                            onClick={handleCloseMenu}
                            className="flex items-center gap-2"
                        >
                            <DeleteIcon color={category} />
                            Excluir
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
}
