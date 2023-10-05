import { TextField } from '@mui/material';
import * as Yup from 'yup';

interface PasswordFieldProps {
    name: string;
    value: string;
    type: string;
    error: boolean;
}

export default function ConfirmationPasswordField(props: PasswordFieldProps) {
    return <TextField id="password" label="Confirme sua senha" variant="outlined" {...props} />;
}

export const confirmationPasswordYupValidations = {
    passwordConfirmation: Yup.string()
        .required('Campo obrigatório')
        .oneOf([Yup.ref('password'), ''], 'Senhas não conferem'),
};
