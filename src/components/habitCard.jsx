import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Checkbox, IconButton, Menu, MenuItem } from "@mui/material";
import { isToday, parseISO } from "date-fns";
import { useState } from "react";

export default function HabitCard({
    id,
    title,
    classification,
    category,
    date,
    conclusionDate = "",
}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);

    const handleCloseMenu = () => setAnchorEl(null);

    const styleMap = (category) => {
        const categories = {
            health: "border-green-900",
            study: "border-purple-900",
            bad: "border-red-900",
            other: "border-gray-800",
        };

        return categories[category] || "";
    };

    return (
        <div className={`w-full rounded-sm p-2 border-2 ${styleMap(category)}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <Checkbox
                        defaultChecked={!!conclusionDate}
                        disabled={!isToday(parseISO(date))}
                        size="medium"
                        color={classification}
                    />
                    <span>{title}</span>
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
