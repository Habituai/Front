import { TextField } from "@mui/material";

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
