import { TextField } from '@mui/material';
import * as Yup from 'yup';

interface NewPasswordFieldProps {
    name: string;
    value: string;
    type: string;
    error: boolean;
}

export default function NewPasswordField(props: NewPasswordFieldProps) {
    return <TextField id="password" label="Nova senha" variant="outlined" {...props} />;
}

export const newPasswordYupValidations = {
    password: Yup.string().min(2, 'Senha muito curta').max(30, 'Senha muito grande').trim('Senha inválida'),
};
