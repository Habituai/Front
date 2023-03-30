import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@mui/material";

import NameField from "../components/field/name";
import EmailField from "../components/field/email";
import PasswordField from "../components/field/password";

function SignUp() {
	return (
		<Formik
			initialValues={{ name: "", password: "", email: "" }}
			validationSchema={Yup.object({
				name: Yup.string()
					.max(15, "Must be 15 characters or less")
					.required("Required"),
				password: Yup.string()
					.max(20, "Must be 20 characters or less")
					.required("Required"),
				email: Yup.string()
					.email("Invalid email address")
					.required("Required"),
			})}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}, 200);
			}}
		>
			<Form>
				<div className="w-full h-screen flex justify-center items-center flex-col gap-4">
					<div className="flex flex-row">
						<Field
							as={NameField}
							name="name"
							type="text"
							error={true}
						/>
						<ErrorMessage name="name" />
					</div>

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
						Criar
					</Button>
				</div>
			</Form>
		</Formik>
	);
}

export default SignUp;
