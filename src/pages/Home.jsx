import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="w-full h-screen flex justify-center items-center flex-col">
			<Button component={Link} to="/sign-up">
				Cadastrar
			</Button>
			<Button component={Link} to="/sign-in">
				Login
			</Button>
		</div>
	);
}

export default Home;
