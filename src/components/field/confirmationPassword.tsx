import { TextField } from '@mui/material';
import * as Yup from 'yup';

interface PasswordFieldProps {
    name: string;
    value: string;
    type: string;
    error: boolean;
}

export default function ConfirmationPasswordField(props: PasswordFieldProps) {
    return <TextField id="passwordConfirmation" label="Confirme sua senha" variant="outlined" {...props} />;
}

export const confirmationPasswordYupValidations = {
    passwordConfirmation: Yup.string().when('password', {
        is: (value: string) => value?.length,
        then: (rule) => rule.oneOf([Yup.ref('password'), ''], 'Senhas não conferem').required('Campo obrigatório'),
    }),
};
