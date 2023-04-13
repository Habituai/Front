import studyImage from "../../assets/images/study.svg";

export default function StudyImage() {
    return (
        <>
            <h1 className="text-5xl text-blue-800 font-bold">Habituaí</h1>

            <img src={studyImage} width={480} />

            <span className="text-gray-900 text-2xl">
                Não deixe para amanhã o que você pode fazer hoje
            </span>
        </>
    );
}
