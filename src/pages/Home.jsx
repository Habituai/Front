import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import toDoImage from "../assets/images/todo.svg";

function Home() {
    return (
        <section className="w-full h-screen flex flex-col px-12 bg-primaryDark">
            <header className="w-full flex justify-between py-4">
                <h1 className="text-6xl text-secondaryLight font-bold">
                    Habituaí
                </h1>

                {/* <nav className="flex justify-between items-center gap-8">
                    <span className="text-md text-gray-200 hover:text-gray-400 cursor-pointer">
                        Sobre
                    </span>

                    <span className="text-md text-gray-200 hover:text-gray-400 cursor-pointer">
                        Desenvolvedores
                    </span>
                </nav> */}

                <nav className="flex justify-between items-center gap-8">
                    <Link to="/sign-up">
                        <Button variant="contained" color="good" size="large">
                            Crie sua conta
                        </Button>
                    </Link>
                    <Link to="/sign-in">
                        <Button variant="outlined" color="good" size="large">
                            Já possuo conta
                        </Button>
                    </Link>
                </nav>
            </header>

            <div className="w-full h-full flex justify-center items-center">
                <div className="w-full flex flex-1 flex-col gap-12">
                    <h3 className="text-secondaryExtraLight font-bold text-7xl">
                        QUER CRIAR NOVOS HÁBITOS?
                    </h3>

                    <p className="text-gray-300 text-xl">
                        Com o Habituaí você pode gerenciar e organizar uma
                        semana completa de hábitos
                    </p>
                </div>

                <div className="w-full flex flex-1 flex-col">
                    <img src={toDoImage} />
                </div>
            </div>
        </section>
    );
}

export default Home;
