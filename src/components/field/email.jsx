import { TextField } from "@mui/material";

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
