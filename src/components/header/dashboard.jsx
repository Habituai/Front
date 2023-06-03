import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Button, Menu, MenuItem } from "@mui/material";
import { format, parseISO } from "date-fns";
import Cookies from "js-cookie";
import { useState } from "react";

export default function DashboardHeader({
    name,
    xp,
    weekDaysList,
    setOpenCreateHabitModal,
    setOpenEditUserModal,
}) {
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
        <header className="w-full py-6 px-32 flex justify-center bg-primaryDark shadow-xl">
            <nav className="w-full flex items-center">
                <span className="flex flex-1 text-5xl text-secondaryExtraLight font-bold">
                    Habituaí
                </span>

                <div className="flex flex-none justify-center items-center gap-8">
                    <div className="flex items-center justify-center gap-2 text-white">
                        <ArrowCircleLeftIcon
                            color="secondary"
                            fontSize="large"
                            className="cursor-pointer"
                        />
                        <span className="text-xl">
                            {`${format(
                                parseISO(weekDaysList[0]),
                                "dd/MM"
                            )} - ${format(
                                parseISO(weekDaysList[weekDaysList.length - 1]),
                                "dd/MM"
                            )}`}
                        </span>

                        <ArrowCircleRightIcon
                            color="secondary"
                            fontSize="large"
                            className="cursor-pointer"
                        />
                    </div>

                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() => setOpenCreateHabitModal(true)}
                    >
                        CRIAR NOVO HÁBITO
                    </Button>
                </div>

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
