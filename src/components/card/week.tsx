import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { format, parseISO } from 'date-fns';

interface WeekSelectorCardProps {
    weekDaysList: string[];
    handleSubWeek: () => void;
    handleAddWeek: () => void;
}

export default function WeekSelectorCard({ weekDaysList, handleSubWeek, handleAddWeek }: WeekSelectorCardProps) {
    return (
        <div className="w-full xl:w-auto flex items-center justify-between xl:justify-center gap-2 text-white py-2 px-4 bg-primaryExtraLight rounded-xl shadow-md">
            <button onClick={handleSubWeek}>
                <ArrowCircleLeftIcon
                    color="bom"
                    style={{ fontSize: '2rem' }}
                    className="cursor-pointer drop-shadow-sm hover:text-secondaryMedium hover:transition-all"
                />
            </button>

            <span className="text-xl">
                {`${format(parseISO(weekDaysList[0]), 'dd/MM')} - ${format(
                    parseISO(weekDaysList[weekDaysList.length - 1]),
                    'dd/MM',
                )}`}
            </span>

            <button onClick={handleAddWeek}>
                <ArrowCircleRightIcon
                    color="bom"
                    style={{ fontSize: '2rem' }}
                    className="cursor-pointer drop-shadow-sm hover:text-secondaryMedium hover:transition-all"
                />
            </button>
        </div>
    );
}
