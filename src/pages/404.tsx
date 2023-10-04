import { Link } from 'react-router-dom';
import error404Image from '../assets/images/404.svg';
import { paths } from '../paths';

function Error404() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
            <h1 className="text-primaryDark font-bold text-3xl xl:text-5xl text-center">Ué? Não existe essa página!</h1>
            <img src={error404Image} alt="Erro página não encontrada" className="w-3/4 xl:w-1/3" />
            <Link
                className="text-2xl text-primaryMedium hover:text-primaryExtraLight font-semibold underline"
                to={paths.home}
            >
                Voltar para a home
            </Link>
        </div>
    );
}

export default Error404;
