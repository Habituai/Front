import { useState } from "react";

export default function SignHeaderLayout({ imageSrc }) {
    const messageList = [
        "Não perca tempo e comece a ser uma pessoa melhor",
        "Não deixe para amanhã o que você pode fazer hoje",
        "Seja hoje melhor que ontem, e amanhã supere quem foi hoje",
        "Você só vai vencer amanhã se não desistir hoje",
        "Não tenha medo de crescer devagar, tenha medo somente de ficar parado",
        "Já pensou que você já superou muitas dificuldades até aqui?",
        "Mesmo que a jornada seja lenta, abrir mão não acelera",
        "O futuro ainda não chegou, seja grato pelo agora",
    ];

    const [randomIndex] = useState(
        Math.floor(Math.random() * messageList.length)
    );

    return (
        <div className="w-3/4 flex flex-col justify-center items-center gap-6 lg:gap-10">
            <h1 className="text-6xl text-secondaryLight font-bold drop-shadow-md">
                Habituaí
            </h1>

            <img
                src={imageSrc}
                className="w-3/4 drop-shadow-xl max-w-[400px] lg:max-w-[400px]"
            />

            <span className="text-gray-900 text-lg lg:text-2xl text-center">
                "{messageList[randomIndex]}"
            </span>
        </div>
    );
}
