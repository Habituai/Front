import { TextField } from "@mui/material";

export default function NameField(props) {
    return (
        <TextField id="name" label="Nome/Nick" variant="outlined" {...props} />
    );
}
