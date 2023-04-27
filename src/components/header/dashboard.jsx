import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import Cookies from "js-cookie";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function DashboardHeader({ name, xp }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);

    const handleCloseMenu = () => setAnchorEl(null);

    const handleLogout = () => {
        Cookies.remove("token");
        window.location.href = "/";
    };

    const getLevelByXP = (xp) => Math.ceil(xp / 100);

    return (
        <header className="w-full py-5 flex justify-center">
            <nav className="w-3/4 flex justify-between items-center">
                <span className="text-6xl text-blue-900 font-bold">
                    Habituaí - Semana de Hábitos
                </span>
                <div className="flex justify-between items-center gap-8">
                    <span>{`${xp}xp`}</span>
                    <span>{`Nível ${getLevelByXP(xp)}`}</span>
                    <button
                        onClick={handleOpenMenu}
                        className="flex items-center"
                    >
                        {name.toUpperCase()} <ArrowDropDownIcon />
                    </button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={handleCloseMenu}>
                            Gerar relatório de progresso
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu}>
                            Meu perfil
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Deslogar</MenuItem>
                    </Menu>
                </div>
            </nav>
        </header>
    );
}
