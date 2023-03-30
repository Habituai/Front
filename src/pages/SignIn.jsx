import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@mui/material";

import EmailField from "../components/field/email";
import PasswordField from "../components/field/password";

import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function SignIn() {
	const navigate = useNavigate();
	const { setAuth } = useAuth();

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			validationSchema={Yup.object({
				email: Yup.string()
					.email("Invalid email address")
					.required("Required"),
				password: Yup.string()
					.max(20, "Must be 20 characters or less")
					.required("Required"),
			})}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					//Armazenar informações - porém com cookies
					//localStorage.setItem("token", "some-login-token");

					setAuth(true);
					navigate("/dashboard");
				}, 200);
			}}
		>
			<Form>
				<div className="w-full h-screen flex justify-center items-center flex-col gap-4">
					<div className="flex flex-row">
						<Field name="email" type="email" as={EmailField} />
						<ErrorMessage name="email" />
					</div>

					<div className="flex flex-row">
						<Field
							name="password"
							type="password"
							as={PasswordField}
						/>
						<ErrorMessage name="password" />
					</div>

					<Button type="submit" variant="contained">
						Logar
					</Button>
				</div>
			</Form>
		</Formik>
	);
}

export default SignIn;
