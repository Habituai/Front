import { TextField } from "@mui/material";
import * as Yup from "yup";

export default function NameField(props) {
    return (
        <TextField
            id="name"
            label="Nome/Apelido"
            variant="outlined"
            {...props}
        />
    );
}

export const nameYupValidations = {
    name: Yup.string()
        .min(2, "Nome inválido")
        .max(15, "Nome inválido")
        .required("Campo obrigatório")
        .trim("Nome inválido"),
};
