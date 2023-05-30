import { TextField } from "@mui/material";
import * as Yup from "yup";

export default function EmailField(props) {
    return (
        <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            {...props}
        />
    );
}

export const emailYupValidations = () => {
    return {
        email: Yup.string()
            .email("Email inválido")
            .required("Campo obrigatório"),
    };
};
