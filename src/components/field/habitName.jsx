import { TextField } from "@mui/material";
import * as Yup from "yup";

export default function HabitNameField(props) {
    return (
        <TextField
            id="name"
            label="Nome do hábito*"
            variant="outlined"
            {...props}
        />
    );
}

export const habitNameYupValidations = {
    name: Yup.string()
        .min(2, "Nome inválido")
        .required("Campo obrigatório")
        .trim("Nome inválido"),
};
