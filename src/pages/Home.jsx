import { Link } from "react-router-dom";

function Home() {
    return (
        <header className="w-full py-5 flex justify-center">
            <nav className="w-3/4 flex justify-between items-center">
                <span className="text-6xl text-primaryDark font-bold">
                    Habituaí
                </span>
                <div className="flex justify-between items-center gap-8">
                    <Link
                        className="text-2xl text-primaryMedium hover:text-primaryExtraLight font-semibold"
                        to="/sign-up"
                    >
                        Cadastrar
                    </Link>
                    <Link
                        className="text-2xl text-primaryMedium hover:text-primaryExtraLight font-semibold"
                        to="/sign-in"
                    >
                        Login
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Home;
