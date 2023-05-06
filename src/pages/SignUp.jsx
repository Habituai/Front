import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import NameField, { nameYupValidations } from "../components/field/name";
import EmailField, { emailYupValidations } from "../components/field/email";
import PasswordField, {
    passwordYupValidations,
} from "../components/field/password";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../services/axios";
import healthImage from "../assets/images/health.svg";
import SignHeaderLayout from "../components/layout/signHeader";
import FieldInput from "../components/layout/field";

function SignUp() {
    const navigate = useNavigate();
    const host = import.meta.env.VITE_SIGN_UP_PATH;

    const formInitialValues = { name: "", password: "", email: "" };

    const handleValidationSchema = Yup.object().shape({
        ...emailYupValidations,
        ...nameYupValidations,
        ...passwordYupValidations,
    });

    const handleFormSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            await makeRequest("POST", host, { data: values });
            navigate("/sign-in");
        } catch (error) {
            if (error.response.status === 422) {
                toast.error("Email já cadastrado");
            } else {
                toast.error("Não foi possível criar a conta");
            }
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
                    <div className="w-full h-full lg:h-screen flex flex-col lg:flex-row justify-center items-center lg:gap-28">
                        <div className="h-full w-full flex flex-1 justify-center lg:justify-end items-center py-5 lg:p-0">
                            <SignHeaderLayout imageSrc={healthImage} />
                        </div>

                        <div className="h-full w-full flex flex-1 justify-center lg:justify-start items-center py-5 lg:p-0">
                            <div className="max-w-3/4 lg:min-w-[480px] bg-white rounded-lg shadow-lg">
                                <Form className="flex justify-center items-center flex-col gap-3 lg:gap-8 p-10">
                                    <h4 className="w-full mb-4 text-3xl font-bold text-primaryDark">
                                        Crie sua conta
                                    </h4>

                                    <FieldInput
                                        name="name"
                                        type="text"
                                        fieldComponent={NameField}
                                        hasError={!!errors.name}
                                    />

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
                                            {`Já possui conta? `}
                                            <Link
                                                className="text-primaryMedium hover:text-primaryExtraLight font-semibold underline"
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
                                </Form>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
}

export default SignUp;
