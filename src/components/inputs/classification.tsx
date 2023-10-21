import { Radio } from '@mui/material';

interface StyleOptions {
    bom: string;
    ruim: string;
    default: string;
}

export const ClassificationRadioButton = ({ value, label }: { value: 'bom' | 'ruim'; label: string }) => {
    const baseStyle = 'w-full p-2 xl:h-12 rounded-lg text-md xl:text-xl border-2';

    const checkedStyles: StyleOptions = {
        bom: 'bg-primaryDark border-primaryDark',
        ruim: 'bg-red-800 border-red-800',
        default: 'font-bold text-white',
    };

    const uncheckedStyle: StyleOptions = {
        bom: 'border-primaryDark text-primaryDark',
        ruim: 'border-red-800 text-red-800',
        default: 'bg-white',
    };

    const BaseButton = () => (
        <button className={`${baseStyle} ${uncheckedStyle.default} ${uncheckedStyle[value]}`}>{label}</button>
    );

    const CheckedButton = () => (
        <button className={`${baseStyle} ${checkedStyles.default} ${checkedStyles[value]}`}>{label}</button>
    );

    return <Radio disableRipple value={value} icon={<BaseButton />} checkedIcon={<CheckedButton />} />;
};
