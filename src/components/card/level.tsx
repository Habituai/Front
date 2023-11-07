import StarIcon from '@mui/icons-material/Star';

interface LevelCardProps {
    experience: number;
}

export default function LevelCard({ experience }: LevelCardProps) {
    const starColors = [
        '#ffffff',
        '#fff200',
        '#ff7700',
        '#12c901',
        '#cf0202',
        '#00b3ff',
        '#b300ff',
        '#b46102',
        '#d1d0e0',
        '#ffdd00',
    ];

    const level = experience > 0 ? Math.ceil(experience / 100) : 1;
    const levelColor = level < 11 ? starColors[level - 1] : starColors.at(-1);

    return (
        <span className="flex justify-center items-center gap-1 py-2 px-4 text-xl bg-primaryExtraLight text-white rounded-lg shadow-md">
            <StarIcon sx={{ color: levelColor }} className="shadow-xl" />
            {`Nível ${level}`}
        </span>
    );
}
