import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MoreIcon from '@mui/icons-material/More';
import WeekendIcon from '@mui/icons-material/Weekend';
import { Radio } from '@mui/material';
import { isMobile } from 'react-device-detect';

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
    const iconHeight = isMobile ? { fontSize: '1.5rem' } : { fontSize: '3rem' };

    const baseStyle =
        'xl:w-[160px] w-[120px] h-full p-1 xl:p-2 rounded-lg flex justify-center items-center flex-col border-2 text-md xl:text-lg';

    const checkedStyles: StyleOptions = {
        1: 'bg-secondaryDark border-secondaryDark',
        2: 'bg-purple-900 border-purple-900',
        3: 'bg-blue-900 border-blue-900',
        4: 'bg-gray-900 border-gray-900',
        default: 'font-bold text-white',
    };

    const uncheckedStyle: StyleOptions = {
        1: 'border-secondaryDark',
        2: 'border-purple-900',
        3: 'border-blue-900',
        4: 'border-gray-900',
        default: 'bg-white text-black',
    };

    const baseIcon = {
        1: <HealthAndSafetyIcon color="saude" sx={iconHeight} />,
        2: <MenuBookIcon color="educacao" sx={iconHeight} />,
        3: <WeekendIcon color="lazer" sx={iconHeight} />,
        4: <MoreIcon color="outro" sx={iconHeight} />,
    };

    const checkedIcon = {
        1: <HealthAndSafetyIcon color="white" sx={iconHeight} />,
        2: <MenuBookIcon color="white" sx={iconHeight} />,
        3: <WeekendIcon color="white" sx={iconHeight} />,
        4: <MoreIcon color="white" sx={iconHeight} />,
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
