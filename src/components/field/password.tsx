import { TextField } from '@mui/material';
import * as Yup from 'yup';

interface PasswordFieldProps {
    name: string;
    value: string;
    type: string;
    error: boolean;
}

export default function PasswordField(props: PasswordFieldProps) {
    return <TextField id="password" label="Senha" variant="outlined" {...props} />;
}

export const passwordYupValidations = {
    password: Yup.string()
        .min(2, 'Senha muito curta')
        .max(30, 'Senha muito grande')
        .required('Campo obrigatório')
        .trim('Senha inválida'),
};
