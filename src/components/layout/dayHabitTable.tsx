import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material';
import { format, isToday, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { ReactElement, useState } from 'react';
import { isMobile } from 'react-device-detect';

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
    const [isExpanded, setIsExpanded] = useState(today || !isMobile);

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={1.714} className="py-2 px-4 xl:p-1">
            <Accordion
                sx={today ? { background: '#006d00', border: '2px solid #006d00' } : {}}
                expanded={isExpanded}
                onChange={() => setIsExpanded(!isExpanded)}
                disableGutters
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon color={`${today ? 'white' : 'primary'}`} className="text-white" />}
                >
                    <div className="flex items-center justify-between h-full w-full">
                        <span className={`${today ? 'text-white' : 'text-primaryDark'} text-xl font-bold`}>
                            {today ? 'Hoje' : formattedDay} - {dateName}
                        </span>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={today ? 'bg-white' : ''}>
                    <div className={`w-full ${today ? 'bg-white' : 'bg-primaryDark'} h-1 rounded-full mb-3`} />
                    <div className="flex flex-col items-center gap-4">{children}</div>
                </AccordionDetails>
            </Accordion>
        </Grid>
    );
}
