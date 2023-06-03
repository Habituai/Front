import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Menu, MenuItem } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";

export default function DashboardHeader({ name, xp, setOpenEditUserModal }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);

    const handleCloseMenu = () => setAnchorEl(null);

    const handleLogout = () => {
        Cookies.remove("token");
        window.location.href = "/";
    };

    const getLevelByXP = (xp) => Math.ceil(xp / 100);

    const handleAccountData = () => {
        setOpenEditUserModal(true);
        handleCloseMenu();
    };

    return (
        <header className="w-full py-5 flex justify-center bg-primaryDark">
            <nav className="w-full flex items-center px-8">
                <span className="flex flex-1 text-4xl text-secondaryExtraLight font-bold">
                    Habituaí
                </span>

                <span className="flex-none text-5xl font-bold text-white">
                    Semana de Hábitos
                </span>

                <div className="flex flex-1 justify-end items-center gap-6 text-white text-xl">
                    <span>
                        {`${xp} `}
                        <span className="text-yellow-400 font-bold">xp</span>
                    </span>
                    <span className="text-secondaryExtraLight font-bold">{`-`}</span>
                    <span>{`Nível ${getLevelByXP(xp)}`}</span>
                    <span className="text-secondaryExtraLight font-bold">{`|`}</span>
                    <button
                        onClick={handleOpenMenu}
                        className="flex items-center font-bold"
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
                        <MenuItem onClick={handleAccountData}>
                            Meu perfil
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Sair</MenuItem>
                    </Menu>
                </div>
            </nav>
        </header>
    );
}
