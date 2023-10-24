interface HomeCardProps {
    title: string;
    description: string;
}

export default function HomeCard({ title, description }: HomeCardProps) {
    return (
        <div className="bg-secondaryExtraLight flex flex-col gap-2 p-4 max-w-[380px] mt-[-24px] mb-[-12px] shadow-2xl rounded-xl">
            <h4 className="text-white shadow-sm font-bold text-xl">{title}</h4>
            <p className="text-gray-800 text-md">{description}</p>
        </div>
    );
}
