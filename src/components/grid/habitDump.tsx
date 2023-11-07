import UndoIcon from '@mui/icons-material/Undo';
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { envs } from '../../config';
import { useUpdateHabits } from '../../hooks/useUpdateHabits';
import { Habit } from '../../pages/Dashboard';
import { makeRequestWithAuthorization } from '../../services/makeRequestWithAuthorization';

interface HabitRow {
    id: number;
    name: string;
    classification: string;
    category: string;
    dateCreation: string;
}

interface HabitDumpGridProps {
    setOpenHabitDumpModal: React.Dispatch<React.SetStateAction<boolean>>;
}

enum CategoryTranslation {
    'Saúde' = 1,
    'Educação' = 2,
    'Lazer' = 3,
    'Outro' = 4,
}

export default function HabitDumpGrid({ setOpenHabitDumpModal }: HabitDumpGridProps) {
    const habitsHost = envs.habitPath;

    const { habitsHasUpdate, setHabitsHasUpdate } = useUpdateHabits();
    const [habits, setHabits] = useState<[Habit]>();

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#04630a',
            color: theme.palette.common.white,
            fontWeight: 'bold',
            fontSize: 16,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },

        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const habitRows =
        habits?.map((habit) => {
            const { id, name, classification } = habit;

            return {
                id,
                name,
                classification: classification.toUpperCase(),
                category: CategoryTranslation[habit.category.id],
                dateCreation: format(new Date(habit.dateCreation), 'dd/MM/yyyy'),
            };
        }) || [];

    const handleRestoreHabit = async (row: HabitRow) => {
        await makeRequestWithAuthorization('PATCH', `${habitsHost}/${row.id}`);
        setHabitsHasUpdate(true);
        toast.success(`Hábito ${row.name} restaurado!`);
    };

    const handleGetHabitsData = async () => {
        const habits: [Habit] = await makeRequestWithAuthorization('GET', habitsHost, { params: { status: false } });
        setHabits(habits);
    };

    useEffect(() => {
        handleGetHabitsData().catch((error) => {
            console.error(error);
            console.error('Erro em buscar os hábitos');
        });
    }, [habitsHasUpdate]);

    return (
        <div className="w-full h-full flex flex-col justify-center gap-12">
            <h1 className="w-full mb-4 text-3xl font-bold text-primaryDark">Lixeira de hábitos</h1>

            {habitRows?.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow className="text-bold">
                                <StyledTableCell className="text-bold">Nome</StyledTableCell>
                                <StyledTableCell>Classificação</StyledTableCell>
                                <StyledTableCell>Categoria</StyledTableCell>
                                <StyledTableCell>Data de criação</StyledTableCell>
                                <StyledTableCell align="center">Retomar</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {habitRows?.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.classification}</StyledTableCell>
                                    <StyledTableCell>{row.category}</StyledTableCell>
                                    <StyledTableCell>{row.dateCreation}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Tooltip title="Retomar o hábito">
                                            <IconButton
                                                onClick={async () => await handleRestoreHabit(row)}
                                                size="small"
                                            >
                                                <UndoIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <div className="w-full flex justify-center items-center">Não há nenhum hábito na lixeira.</div>
            )}

            <div className="w-full flex justify-end">
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={() => setOpenHabitDumpModal(false)}
                    sx={{ width: '40%' }}
                >
                    Voltar
                </Button>
            </div>
        </div>
    );
}
