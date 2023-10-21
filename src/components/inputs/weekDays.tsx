interface ComponentProps {
    children: string;
}

const baseStyle =
    'xl:w-[50px] w-[40px] xl:h-[50px] h-[40px] p-1 text-xl rounded-full flex justify-center items-center border-2 text-primaryDark font-bold font-reemKufi';

const WeekDayCheckBoxBaseButton = ({ children }: ComponentProps) => (
    <button className={`${baseStyle} bg-white border-primaryDark`}>{children}</button>
);

const WeekDayCheckBoxCheckedButton = ({ children }: ComponentProps) => (
    <button className={`${baseStyle} bg-primaryDark border-primaryDark text-white`}>{children}</button>
);

const WeekDayCheckBoxDisabledButton = ({ children }: ComponentProps) => (
    <button className={`${baseStyle} bg-gray-400 border-gray-400 text-white`}>{children}</button>
);

export { WeekDayCheckBoxBaseButton, WeekDayCheckBoxCheckedButton, WeekDayCheckBoxDisabledButton };
