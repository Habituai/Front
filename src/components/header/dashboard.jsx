import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArticleIcon from "@mui/icons-material/Article";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import { Button, Menu, MenuItem } from "@mui/material";
import { format, parseISO } from "date-fns";
import Cookies from "js-cookie";
import { useState } from "react";
import checkBoxIcon from "../../assets/images/checkbox.svg";

export default function DashboardHeader({
    name,
    experience,
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

    const getLevelByXP = (xp) => (xp ? Math.ceil(xp / 100) : 1);

    const handleAccountData = () => {
        setOpenEditUserModal(true);
        handleCloseMenu();
    };

    return (
        <header className="w-full py-6 lg:px-20 flex justify-center bg-primaryDark shadow-xl">
            <nav className="w-full flex flex-col lg:flex-row items-center gap-4 lg:gap-0">
                <span className="flex flex-1 items-center gap-2 text-4xl text-secondaryExtraLight font-bold">
                    <img src={checkBoxIcon} alt="logo" className="w-8 h-8" />
                    Habituaí
                </span>

                <div className="flex flex-none justify-center items-center gap-8">
                    <div className="flex items-center justify-center gap-2 text-white py-2 px-4 bg-primaryExtraLight rounded-xl shadow-md">
                        <ArrowCircleLeftIcon
                            color="bom"
                            fontSize="large"
                            className="cursor-pointer"
                        />
                        <span className="text-lg">
                            {`${format(
                                parseISO(weekDaysList[0]),
                                "dd/MM"
                            )} - ${format(
                                parseISO(weekDaysList[weekDaysList.length - 1]),
                                "dd/MM"
                            )}`}
                        </span>

                        <ArrowCircleRightIcon
                            color="bom"
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
                    <span className="py-2 px-4 bg-primaryExtraLight text-white rounded-lg shadow-md">
                        {`${experience} `}
                        <span className="text-secondaryExtraLight font-bold">
                            xp
                        </span>
                    </span>
                    <span className="py-2 px-4 bg-primaryExtraLight text-white rounded-lg shadow-md">
                        {`Nível ${getLevelByXP(experience)}`}
                    </span>
                    <button
                        onClick={handleOpenMenu}
                        className="flex items-center font-bold text-2xl gap-2"
                    >
                        <AccountCircleIcon fontSize="large" />
                        <div>
                            {name.toUpperCase()}
                            <ArrowDropDownIcon />
                        </div>
                    </button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem
                            onClick={handleCloseMenu}
                            className="flex items-center gap-2"
                        >
                            <ArticleIcon />
                            Gerar relatório de progresso
                        </MenuItem>
                        <MenuItem
                            onClick={handleAccountData}
                            className="flex items-center gap-2"
                        >
                            <PersonIcon />
                            Meus dados
                        </MenuItem>
                        <MenuItem
                            onClick={handleLogout}
                            className="flex items-center gap-2"
                        >
                            <CancelIcon />
                            Sair da plataforma
                        </MenuItem>
                    </Menu>
                </div>
            </nav>
        </header>
    );
}
