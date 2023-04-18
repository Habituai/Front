import { Grid } from "@mui/material";

export default function DayHabitTableLayout({ children, date, dateName }) {
    return (
        <Grid item xs={12} sm={6} lg={2}>
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <span className="text-primaryMedium text-2xl font-bold">
                        {date}
                    </span>
                    <span className="text-primaryLight text-lg font-semibold">
                        {dateName}
                    </span>
                </div>
                <div className="w-full bg-primaryLight h-1 rounded-full mb-3" />
                <div className="flex flex-col items-center gap-1">
                    {children}
                </div>
            </div>
        </Grid>
    );
}
