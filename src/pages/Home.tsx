import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import toDoImage from '../assets/images/todo.svg';
import HomeCard from '../components/card/home';
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
                <HomeCard
                    title="Organização"
                    description="Com o Habituaí você tem o controle dos seus hábitos em uma semana completa."
                />
                <HomeCard
                    title="Gerenciamento"
                    description="Com o Habituaí você pode gerenciar e customizar seus hábitos da maneira que quiser."
                />
                <HomeCard
                    title="Gamificação"
                    description="Com o Habituaí você ganha pontos e sobe de nível com suas vitórias."
                />
                <HomeCard
                    title="Progresso"
                    description=" Com o Habituaí você evolui todo dia para ser uma pessoa melhor, aquela que você sempre sonhou em ser."
                />
            </div>
        </section>
    );
}

export default Home;
