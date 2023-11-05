import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import Hamburger from 'hamburger-react';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import checkBoxIcon from '../assets/images/checkbox.svg';
import systemImage from '../assets/images/system.png';
import { paths } from '../paths';

function Home() {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const desktopView = () => {
        return (
            <section className="w-full h-screen flex flex-col">
                <header className="w-full flex justify-between py-4 px-32 bg-primaryDark shadow-md">
                    <h1 className="flex items-center gap-2 text-5xl text-secondaryExtraLight font-bold">
                        <img src={checkBoxIcon} alt="logo" className="w-10 h-10" />
                        Habituaí
                    </h1>

                    <nav className="flex items-center gap-12 text-gray-100">
                        <Link to={paths.signUp}>
                            <Button variant="contained" color="bom" size="large" sx={{ fontWeight: 'bold' }}>
                                Crie sua conta
                            </Button>
                        </Link>
                        <Link to={paths.signIn}>
                            <Button variant="contained" color="white" size="large" sx={{ fontWeight: 'bold' }}>
                                Já possuo conta
                            </Button>
                        </Link>
                    </nav>
                </header>

                <div className="w-full h-full flex justify-center items-center px-32">
                    <div className="w-full flex flex-1 flex-col gap-8">
                        <h1 className="text-primaryDark font-bold text-5xl drop-shadow-md">
                            Planeje e acompanhe seus hábitos com um sistema de gamificado
                        </h1>

                        <h2 className="text-secondaryDark font-bold text-2xl mb-12">
                            Ganhe XP e upe de level ao concluir hábitos todos os dias
                        </h2>

                        <div className="text-gray-800 flex flex-col gap-2">
                            <p>
                                O Habituaí é um sistema que te ajuda a criar e manter hábitos saudáveis, produtivos e
                                divertidos.
                            </p>
                            <p>Você pode escolher entre vários hábitos pré-definidos ou criar os seus próprios.</p>
                            <p>
                                A cada dia que você completar um hábito, você ganha pontos de experiência (XP) que te
                                permitem subir de nível e desbloquear novas recompensas.
                            </p>
                        </div>
                    </div>

                    <div className="w-full flex flex-1 flex-col">
                        <img src={systemImage} className="drop-shadow-md" />
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
                            Com o Habituaí você evolui todo dia para ser uma pessoa melhor, aquela que você sempre
                            sonhou em ser.
                        </p>
                    </div>
                </div>
            </section>
        );
    };

    const mobileView = () => {
        return (
            <>
                <div className="fixed w-full z-50">
                    <Accordion
                        disableGutters
                        square
                        sx={{ background: '#002782' }}
                        expanded={isAccordionOpen}
                        onChange={() => setIsAccordionOpen(!isAccordionOpen)}
                    >
                        <AccordionSummary
                            sx={{ width: '100%' }}
                            expandIcon={
                                <Hamburger color="#12b52f" toggled={isAccordionOpen} toggle={setIsAccordionOpen} />
                            }
                        >
                            <h1 className="flex items-center gap-2 text-4xl text-secondaryExtraLight font-bold">
                                <img src={checkBoxIcon} alt="logo" className="w-10 h-10" />
                                Habituaí
                            </h1>
                        </AccordionSummary>
                        <AccordionDetails>
                            <nav className="h-full flex flex-col justify-center items-center gap-4">
                                <Link to={paths.signUp} className="w-full">
                                    <Button variant="contained" color="bom" size="large" className="w-full">
                                        Crie sua conta
                                    </Button>
                                </Link>
                                <Link to={paths.signIn} className="w-full">
                                    <Button variant="contained" color="white" size="large" className="w-full">
                                        Já possuo conta
                                    </Button>
                                </Link>
                            </nav>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div className="w-full h-full flex flex-col md:flex-row justify-center items-center px-8 md:px-32 pt-24">
                    <div className="w-full flex flex-1 flex-col gap-8">
                        <h1 className="text-primaryDark font-bold text-4xl drop-shadow-md text-center">
                            Planeje e acompanhe seus hábitos com um sistema de gamificado
                        </h1>

                        <h2 className="text-secondaryDark font-bold text-xl mb-4 text-center">
                            Ganhe XP e upe de level ao concluir hábitos todos os dias
                        </h2>

                        <div className="text-gray-800 flex flex-col gap-2">
                            <p>
                                O Habituaí é um sistema que te ajuda a criar e manter hábitos saudáveis, produtivos e
                                divertidos.
                            </p>
                            <p>Você pode escolher entre vários hábitos pré-definidos ou criar os seus próprios.</p>
                            <p>
                                A cada dia que você completar um hábito, você ganha pontos de experiência (XP) que te
                                permitem subir de nível e desbloquear novas recompensas.
                            </p>
                        </div>
                    </div>

                    <div className="w-full flex flex-1 flex-col mt-8 md:mt-0">
                        <img src={systemImage} className="drop-shadow-md" />
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row gap-8 bg-primaryDark px-8 md:px-32">
                    <div className="bg-secondaryExtraLight flex flex-col gap-2 p-4 max-w-[380px] mt-[-24px] shadow-2xl rounded-xl">
                        <h4 className="text-white shadow-sm font-bold text-xl">Organização</h4>
                        <p className="text-gray-800 text-md">
                            Com o Habituaí você tem o controle dos seus hábitos em uma semana completa.
                        </p>
                    </div>

                    <div className="bg-secondaryExtraLight flex flex-col gap-2 p-4 max-w-[380px] shadow-2xl rounded-xl">
                        <h4 className="text-white shadow-sm font-bold text-xl">Gerenciamento</h4>
                        <p className="text-gray-800 text-md">
                            Com o Habituaí você pode gerenciar e customizar seus hábitos da maneira que quiser.
                        </p>
                    </div>

                    <div className="bg-secondaryExtraLight flex flex-col gap-2 p-4 max-w-[380px] shadow-2xl rounded-xl">
                        <h4 className="text-white shadow-sm font-bold text-xl">Gamificação</h4>
                        <p className="text-gray-800 text-md">
                            Com o Habituaí você ganha pontos e sobe de nível com suas vitórias.
                        </p>
                    </div>

                    <div className="bg-secondaryExtraLight flex flex-col gap-2 p-4 max-w-[380px] mb-[24px] shadow-2xl rounded-xl">
                        <h4 className="text-white shadow-sm font-bold text-xl">Progresso</h4>
                        <p className="text-gray-800 text-md">
                            Com o Habituaí você evolui todo dia para ser uma pessoa melhor, aquela que você sempre
                            sonhou em ser.
                        </p>
                    </div>
                </div>
            </>
        );
    };

    return isMobile ? mobileView() : desktopView();
}

export default Home;
