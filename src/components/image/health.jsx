import healthImage from "../../assets/images/health.svg";

export default function HealthImage() {
    return (
        <>
            <h1 className="text-5xl text-blue-800 font-bold">Habituaí</h1>

            <img src={healthImage} width={480} />

            <span className="text-gray-900 text-2xl">
                Não perca tempo e comece a ser uma pessoa melhor
            </span>
        </>
    );
}
