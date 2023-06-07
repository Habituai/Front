import { TextField } from "@mui/material";
import * as Yup from "yup";

export default function PasswordField(props) {
    return (
        <TextField
            id="password"
            label="Senha"
            type="password"
            variant="outlined"
            {...props}
        />
    );
}

export const passwordYupValidations = {
    password: Yup.string()
        .min(2, "Senha muito curta")
        .max(30, "Senha muito grande")
        .required("Campo obrigatório")
        .trim("Senha inválida"),
};
