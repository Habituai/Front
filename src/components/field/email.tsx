import { TextField } from '@mui/material';
import * as Yup from 'yup';

interface EmailFieldProps {
    name: string;
    value: string;
    type: string;
    error: boolean;
}

export default function EmailField(props: EmailFieldProps) {
    return <TextField id="email" label="Email" variant="outlined" {...props} />;
}

export const emailYupValidations = {
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
};
