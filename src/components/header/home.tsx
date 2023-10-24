import checkBoxIcon from '../../assets/images/checkbox.svg';

export default function HomeHeader() {
    const LinkComponent = ({ title }: { title: string }) => {
        return (
            <span className="cursor-pointer hover:text-gray-200 border-b-4 border-secondaryExtraLight">{title}</span>
        );
    };

    return (
        <header className="w-full flex justify-between py-4 px-32 bg-primaryDark shadow-md">
            <h1 className="flex items-center gap-2 text-5xl text-secondaryExtraLight font-bold">
                <img src={checkBoxIcon} alt="logo" className="w-10 h-10" />
                Habituaí
            </h1>

            <nav className="flex items-center gap-12 text-gray-100">
                <LinkComponent title="Home" />
                <LinkComponent title="Sobre" />
                <LinkComponent title="Suporte" />
            </nav>
        </header>
    );
}
