import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import checkBoxIcon from "../assets/images/checkbox.svg";
import toDoImage from "../assets/images/todo.svg";

function Home() {
    return (
        <section className="w-full h-screen flex flex-col">
            <header className="w-full flex justify-between py-4 px-32 bg-primaryDark shadow-md">
                <h1 className="flex items-center gap-2 text-5xl text-secondaryLight font-bold">
                    <img src={checkBoxIcon} alt="logo" className="w-10 h-10" />
                    Habituaí
                </h1>

                <nav className="flex items-center gap-12 text-gray-100">
                    <span className="cursor-pointer hover:text-gray-200 border-b-4 border-secondaryExtraLight">
                        Home
                    </span>
                    <span className="cursor-pointer hover:text-gray-200">
                        Sobre
                    </span>
                    <span className="cursor-pointer hover:text-gray-200">
                        Suporte
                    </span>
                </nav>
            </header>

            <div className="w-full h-full flex justify-center items-center px-32">
                <div className="w-full flex flex-1 flex-col">
                    <h3 className="text-gray-900 font-bold text-7xl mb-12 drop-shadow-md">
                        QUER CRIAR NOVOS{" "}
                        <span className="text-secondaryLight">HÁBITOS</span>?
                    </h3>

                    <div className="flex items-center gap-8">
                        <Link to="/sign-up">
                            <Button
                                variant="contained"
                                color="bom"
                                size="large"
                                sx={{ fontWeight: "bold" }}
                            >
                                Crie sua conta
                            </Button>
                        </Link>
                        <Link to="/sign-in">
                            <Button
                                variant="outlined"
                                color="bom"
                                size="large"
                                sx={{ background: "#FFF", fontWeight: "bold" }}
                            >
                                Já possuo conta
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="w-full flex flex-1 flex-col">
                    <img src={toDoImage} className="drop-shadow-md" />
                </div>
            </div>

            <div className="w-full flex gap-12 bg-primaryDark px-32">
                <div className="bg-secondaryExtraLight flex flex-col gap-2 p-4 max-w-[380px] mt-[-24px] shadow-2xl rounded-t-xl">
                    <h4 className="text-white shadow-sm font-bold text-xl">
                        Organização
                    </h4>
                    <p className="text-gray-800 text-md">
                        Com o Habituaí você tem o controle dos seus hábitos em
                        uma semana completa.
                    </p>
                </div>

                <div className="bg-secondaryExtraLight flex flex-col gap-2 p-4 max-w-[380px] mt-[-24px] shadow-2xl rounded-t-xl">
                    <h4 className="text-white shadow-sm font-bold text-xl">
                        Gerenciamento
                    </h4>
                    <p className="text-gray-800 text-md">
                        Com o Habituaí você pode gerenciar e customizar seus
                        hábitos da maneira que quiser.
                    </p>
                </div>

                <div className="bg-secondaryExtraLight flex flex-col gap-2 p-4 max-w-[380px] mt-[-24px] shadow-2xl rounded-t-xl">
                    <h4 className="text-white shadow-sm font-bold text-xl">
                        Gamificação
                    </h4>
                    <p className="text-gray-800 text-md">
                        Com o Habituaí você ganha pontos e sobe de nível com
                        suas vitórias.
                    </p>
                </div>

                <div className="bg-secondaryExtraLight flex flex-col gap-2 p-4 max-w-[380px] mt-[-24px] shadow-2xl rounded-t-xl">
                    <h4 className="text-white shadow-sm font-bold text-xl">
                        Progresso
                    </h4>
                    <p className="text-gray-800 text-md">
                        Com o Habituaí você evolui todo dia para ser uma pessoa
                        melhor, aquela que você sempre sonhou em ser.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Home;
