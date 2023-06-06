import { TextField } from "@mui/material";
import * as Yup from "yup";

export default function NewPasswordField(props) {
    return (
        <TextField
            id="password"
            label="Nova senha"
            type="password"
            variant="outlined"
            {...props}
        />
    );
}

export const newPasswordYupValidations = {
    password: Yup.string()
        .min(2, "Senha inválida")
        .max(20, "Senha inválida")
        .trim("Senha inválida"),
};
