import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import toDoImage from '../assets/images/todo.svg';
import HomeHeader from '../components/header/home';
import { paths } from '../paths';

function Home() {
    return (
        <section className="w-full h-screen flex flex-col">
            <HomeHeader />

            <div className="w-full h-full flex justify-center items-center px-32">
                <div className="w-full flex flex-1 flex-col">
                    <h3 className="text-gray-900 font-bold text-7xl mb-12 drop-shadow-md">
                        QUER CRIAR NOVOS <span className="text-secondaryLight">HÁBITOS</span>?
                    </h3>

                    <div className="flex items-center gap-8">
                        <Link to={paths.signUp}>
                            <Button variant="contained" color="bom" size="large" sx={{ fontWeight: 'bold' }}>
                                Crie sua conta
                            </Button>
                        </Link>
                        <Link to={paths.signIn}>
                            <Button
                                variant="outlined"
                                color="bom"
                                size="large"
                                sx={{ background: '#FFF', fontWeight: 'bold' }}
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
                    <h4 className="text-white shadow-sm font-bold text-xl">Organização</h4>
                    <p className="text-gray-800 text-md">
                        Com o Habituaí você tem o controle dos seus hábitos em uma semana completa.
                    </p>
                </div>

                <div className="bg-secondaryExtraLight flex flex-col gap-2 p-4 max-w-[380px] mt-[-24px] shadow-2xl rounded-t-xl">
                    <h4 className="text-white shadow-sm font-bold text-xl">Gerenciamento</h4>
                    <p className="text-gray-800 text-md">
                        Com o Habituaí você pode gerenciar e customizar seus hábitos da maneira que quiser.
                    </p>
                </div>

                <div className="bg-secondaryExtraLight flex flex-col gap-2 p-4 max-w-[380px] mt-[-24px] shadow-2xl rounded-t-xl">
                    <h4 className="text-white shadow-sm font-bold text-xl">Gamificação</h4>
                    <p className="text-gray-800 text-md">
                        Com o Habituaí você ganha pontos e sobe de nível com suas vitórias.
                    </p>
                </div>

                <div className="bg-secondaryExtraLight flex flex-col gap-2 p-4 max-w-[380px] mt-[-24px] shadow-2xl rounded-t-xl">
                    <h4 className="text-white shadow-sm font-bold text-xl">Progresso</h4>
                    <p className="text-gray-800 text-md">
                        Com o Habituaí você evolui todo dia para ser uma pessoa melhor, aquela que você sempre sonhou em
                        ser.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Home;
