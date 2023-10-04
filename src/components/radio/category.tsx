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
    const baseStyle = 'xl:w-[140px] w-[100px] h-full p-2 rounded-lg flex justify-center items-center flex-col';

    const checkedStyles: StyleOptions = {
        1: 'bg-secondaryDark',
        2: 'bg-purple-900',
        3: 'bg-blue-900',
        4: 'bg-gray-900',
        default: 'font-bold text-white',
    };

    const uncheckedStyle: StyleOptions = {
        1: 'border-secondaryDark',
        2: 'border-purple-900',
        3: 'border-blue-900',
        4: 'border-gray-900',
        default: 'border-2 bg-white text-black',
    };

    const baseIcon = {
        1: <HealthAndSafetyIcon color="saude" fontSize="large" />,
        2: <MenuBookIcon color="educacao" fontSize="large" />,
        3: <WeekendIcon color="lazer" fontSize="large" />,
        4: <MoreIcon color="outro" fontSize="large" />,
    };

    const checkedIcon = {
        1: <HealthAndSafetyIcon color="white" fontSize="large" />,
        2: <MenuBookIcon color="white" fontSize="large" />,
        3: <WeekendIcon color="white" fontSize="large" />,
        4: <MoreIcon color="white" fontSize="large" />,
    };

    const BaseButton = () => (
        <button className={`${baseStyle} ${uncheckedStyle.default} ${uncheckedStyle[value]}`}>
            {baseIcon[value]}
            {label}
        </button>
    );

    const CheckedButton = () => (
        <button className={`${baseStyle} ${checkedStyles.default} ${checkedStyles[value]}`}>
            {checkedIcon[value]}
            {label}
        </button>
    );

    return <Radio disableRipple value={value} icon={<BaseButton />} checkedIcon={<CheckedButton />} />;
};
