import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MoreIcon from '@mui/icons-material/More';
import WeekendIcon from '@mui/icons-material/Weekend';
import { Radio } from '@mui/material';

interface StyleOptions {
    1: string;
    2: string;
    3: string;
    4: string;
    default?: string;
}

interface CategoryRadioButtonProps {
    value: 1 | 2 | 3 | 4;
    label: string;
}

export const CategoryRadioButton = ({ value, label }: CategoryRadioButtonProps) => {
    const baseStyle = 'w-full h-full p-2 flex justify-center items-center flex-col rounded-lg bg-gray-800';

    const checkedStyles: StyleOptions = {
        1: 'bg-primaryDark',
        2: '',
        3: '',
        4: '',
        default: 'font-bold text-white',
    };

    const uncheckedStyle: StyleOptions = {
        1: 'bg-primaryDark',
        2: '',
        3: '',
        4: '',
        default: '',
    };

    const icon = {
        1: <HealthAndSafetyIcon color="saude" fontSize="large" />,
        2: <MenuBookIcon color="educacao" fontSize="large" />,
        3: <WeekendIcon color="lazer" fontSize="large" />,
        4: <MoreIcon color="outro" fontSize="large" />,
    };

    const BaseButton = () => (
        <button className={`${baseStyle} ${uncheckedStyle.default} ${uncheckedStyle[value]}`}>
            {icon[value]}
            {label}
        </button>
    );

    const CheckedButton = () => (
        <button className={`${baseStyle} ${checkedStyles.default} ${checkedStyles[value]}`}>
            {icon[value]}
            {label}
        </button>
    );

    return <Radio disableRipple value={value} icon={<BaseButton />} checkedIcon={<CheckedButton />} />;
};
