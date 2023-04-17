import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import makeRequest from "../services/axios";
import { useAuth } from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import EmailField from "../components/field/email";
import PasswordField from "../components/field/password";
import studyImage from "../assets/images/study.svg";
import Cookies from "js-cookie";
import SignHeaderLayout from "../components/layout/signHeader";
import FieldInput from "../components/layout/field";

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
                    <div className="w-full h-full lg:h-screen flex flex-col-reverse lg:flex-row justify-center items-center lg:gap-32">
                        <div className="h-full w-full flex flex-1 justify-center lg:justify-end items-center py-5 lg:p-0">
                            <div className="max-w-3/4 lg:min-w-[480px] bg-white rounded-lg shadow-lg">
                                <Form className="flex justify-center items-center flex-col gap-3 lg:gap-8 p-10">
                                    <h4 className="w-full mb-4 text-3xl font-bold text-primaryDark">
                                        Faça seu login
                                    </h4>

                                    <FieldInput
                                        name="email"
                                        type="email"
                                        fieldComponent={EmailField}
                                        hasError={!!errors.email}
                                    />

                                    <FieldInput
                                        name="password"
                                        type="password"
                                        fieldComponent={PasswordField}
                                        hasError={!!errors.password}
                                    />

                                    <div className="w-full flex gap-2 flex-col">
                                        <span>
                                            {`Não possui conta? `}
                                            <Link
                                                className="text-primaryMedium hover:text-primaryExtraLight font-semibold underline"
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
                                </Form>
                            </div>
                        </div>

                        <div className="h-full w-full flex flex-1 justify-center lg:justify-start items-center py-5 lg:p-0">
                            <SignHeaderLayout imageSrc={studyImage} />
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
}

export default SignIn;
