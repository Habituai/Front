import { TextField } from '@mui/material';
import * as Yup from 'yup';

interface NameFieldProps {
    name: string;
    value: string;
    type: string;
    error: boolean;
}

export default function NameField(props: NameFieldProps) {
    return <TextField id="name" label="Nome/Apelido" variant="outlined" {...props} />;
}

export const nameYupValidations = {
    name: Yup.string().max(10, 'Nome muito grande').required('Campo obrigatório').trim('Nome inválido'),
};
