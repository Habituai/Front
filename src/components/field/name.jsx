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
        .max(10, "Nome muito grande")
        .required("Campo obrigatório")
        .trim("Nome inválido"),
};
