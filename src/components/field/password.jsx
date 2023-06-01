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
        .min(2, "Senha inválida")
        .max(20, "Senha inválida")
        .required("Campo obrigatório")
        .trim("Senha inválida"),
};
