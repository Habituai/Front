import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import makeRequest from "../services/axios";
import { useAuth } from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import EmailField from "../components/field/email";
import PasswordField from "../components/field/password";
import StudyImage from "../components/image/study";
import Cookies from "js-cookie";

function SignIn() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const host = import.meta.env.VITE_LOGIN_PATH;

    const formInitialValues = { email: "", password: "" };

    const handleValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email inválido")
            .required("Campo obrigatório"),
        password: Yup.string()
            .min(2, "Senha inválida")
            .max(20, "Must be 20 characters or less")
            .required("Campo obrigatório"),
    });

    const handleFormSubmit = async (values, { setSubmitting }) => {
        //Armazenar informações - porém com cookies
        setSubmitting(true);
        try {
            const data = await makeRequest("POST", host, { data: values });
            Cookies.set("token", data.token, {
                expires: 7,
                secure: true,
            });
            setAuth(true);
            navigate("/");
        } catch (error) {
            toast.error("Email ou senha incorretos");
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
                        <Form>
                            <div className="min-w-[480px] flex justify-center items-center flex-col gap-8 p-10 bg-white rounded-lg shadow-lg">
                                <div className="w-full mb-4">
                                    <h4 className="text-3xl font-bold text-blue-900">
                                        Faça seu login
                                    </h4>
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
                                        {`Não possui conta? `}
                                        <Link
                                            className="text-blue-800 hover:text-blue-600 font-semibold"
                                            to="/sign-up"
                                        >
                                            Cadastrar
                                        </Link>
                                    </span>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={isSubmitting}
                                        sx={{ width: "100%" }}
                                    >
                                        Entrar
                                    </Button>
                                </div>
                            </div>
                        </Form>

                        <div className="min-w-[480px] flex flex-col justify-center items-center gap-10">
                            <StudyImage />
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
}

export default SignIn;
