import { Grid } from '@mui/material';
import { format, isToday, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { ReactElement } from 'react';

interface DayHabitTableLayoutProps {
    children: ReactElement | ReactElement[];
    date: string;
}

export default function DayHabitTableLayout({ children, date }: DayHabitTableLayoutProps) {
    const formattedDay = format(parseISO(date), 'dd/MM');
    const dateName = format(parseISO(date), 'EEE', {
        locale: pt,
    });
    const today = isToday(parseISO(date));

    return (
        <Grid item xs={12} sm={6} md={4} lg={2} className={`p-6 rounded-3xl ${today ? 'bg-green-50' : ''}`}>
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <span className={`${today ? 'text-secondaryDark' : 'text-primaryDark'} text-xl font-bold`}>
                        {today ? 'Hoje' : formattedDay}
                    </span>
                    <span className={`${today ? 'text-secondaryDark' : 'text-primaryDark'} text-lg font-semibold`}>
                        {dateName}
                    </span>
                </div>
                <div className={`w-full ${today ? 'bg-secondaryDark' : 'bg-primaryDark'}  h-1 rounded-full mb-3`} />
                <div className="flex flex-col items-center gap-4">{children}</div>
            </div>
        </Grid>
    );
}
