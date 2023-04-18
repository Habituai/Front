import { Checkbox, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function HabitCard({ title, done, type, category, date }) {
    const isCheckboxDisabled = () => {
        const todaysDate = new Date();
        return date !== todaysDate.toISOString().slice(0, 10);
    };

    const styleMap = (category) => {
        const categories = {
            health: "border-green-900",
            study: "border-purple-900",
            bad: "border-red-900",
            other: "border-gray-800",
        };

        return categories[category] || "";
    };

    return (
        <div className={`w-full rounded-sm p-2 border-2 ${styleMap(category)}`}>
            <div className="flex items-center justify-between">
                <span className="font-bold">{title}</span>
                <Checkbox
                    defaultChecked={done}
                    disabled={isCheckboxDisabled()}
                    size="medium"
                    color={type}
                />
            </div>
            <div className="flex items-center justify-end gap-1">
                <IconButton size="small">
                    <EditIcon color={category} />
                </IconButton>
                <IconButton size="small">
                    <DeleteIcon color={category} />
                </IconButton>
            </div>
        </div>
    );
}
