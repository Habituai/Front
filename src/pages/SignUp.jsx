import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import NameField from "../components/field/name";
import EmailField from "../components/field/email";
import PasswordField from "../components/field/password";
import { Link, useNavigate } from "react-router-dom";
import makeRequest from "../services/axios";
import HealthImage from "../components/image/health";

function SignUp() {
    const navigate = useNavigate();
    const host = import.meta.env.VITE_SIGN_UP_PATH;

    const formInitialValues = { name: "", password: "", email: "" };

    const handleValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email inválido")
            .required("Campo obrigatório"),
        name: Yup.string()
            .min(2, "Nome inválido")
            .max(15, "Must be 15 characters or less")
            .required("Campo obrigatório"),
        password: Yup.string()
            .min(2, "Senha inválida")
            .max(20, "Must be 20 characters or less")
            .required("Campo obrigatório"),
    });

    const handleFormSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            await makeRequest("POST", host, { data: values });
            navigate("/sign-in");
        } catch (error) {
            toast.error("Não foi possível criar a conta");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />

            <Formik
                initialValues={formInitialValues}
                validationSchema={handleValidationSchema}
                onSubmit={handleFormSubmit}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({ errors, isSubmitting }) => (
                    <div className="w-full h-screen flex flex-col lg:flex-row justify-center items-center gap-32">
                        <div className="min-w-[480px] flex flex-col justify-center items-center gap-10">
                            <HealthImage />
                        </div>

                        <Form>
                            <div className="min-w-[480px] flex justify-center items-center flex-col gap-8 p-10 bg-white rounded-lg shadow-lg">
                                <div className="w-full mb-4">
                                    <h4 className="text-3xl font-bold text-blue-900">
                                        Crie sua conta
                                    </h4>
                                </div>

                                <div className="w-full flex flex-col">
                                    <Field
                                        as={NameField}
                                        name="name"
                                        type="text"
                                        error={!!errors.name}
                                    />
                                    <span className="text-red-600">
                                        <ErrorMessage name="name" />
                                    </span>
                                </div>

                                <div className="w-full flex flex-col">
                                    <Field
                                        as={EmailField}
                                        name="email"
                                        type="email"
                                        error={!!errors.email}
                                    />
                                    <span className="text-red-600">
                                        <ErrorMessage name="email" />
                                    </span>
                                </div>

                                <div className="w-full flex flex-col">
                                    <Field
                                        as={PasswordField}
                                        name="password"
                                        type="password"
                                        error={!!errors.password}
                                    />
                                    <span className="text-red-600">
                                        <ErrorMessage name="password" />
                                    </span>
                                </div>

                                <div className="w-full flex gap-2 flex-col">
                                    <span>
                                        {`Já possui conta? `}
                                        <Link
                                            className="text-blue-800 hover:text-blue-600 font-semibold"
                                            to="/sign-in"
                                        >
                                            Logar
                                        </Link>
                                    </span>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={isSubmitting}
                                        sx={{ width: "100%" }}
                                    >
                                        Criar
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    );
}

export default SignUp;
