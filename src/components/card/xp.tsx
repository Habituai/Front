interface ExperienceCardProps {
    experience: number;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
    const xp = experience > 0 ? experience : 0;

    return (
        <span className="py-2 px-4 text-2xl bg-primaryExtraLight text-white rounded-lg shadow-md flex justify-center items-center gap-1">
            {xp}
            <span className="text-secondaryExtraLight font-bold">xp</span>
        </span>
    );
}
