import { TextField } from '@mui/material';
import * as Yup from 'yup';

interface HabitNameFieldProps {
    name: string;
    value: string;
    type: string;
    error: boolean;
}

export default function HabitNameField(props: HabitNameFieldProps) {
    return <TextField id="name" label="Nome do hábito*" variant="outlined" {...props} />;
}

export const habitNameYupValidations = {
    name: Yup.string()
        .min(2, 'Nome inválido')
        .max(18, 'Nome muito grande')
        .required('Campo obrigatório')
        .trim('Nome inválido'),
};
