interface ExperienceCardProps {
    experience: number;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
    return (
        <span className="py-2 px-4 text-sm xl:text-xl bg-primaryExtraLight text-white rounded-lg shadow-md flex justify-center items-center gap-1">
            {experience}
            <span className="text-secondaryExtraLight font-bold">xp</span>
        </span>
    );
}
