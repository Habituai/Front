import { Button } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import healthImage from '../assets/images/health.svg';
import EmailField, { emailYupValidations } from '../components/field/email';
import NameField, { nameYupValidations } from '../components/field/name';
import PasswordField, { passwordYupValidations } from '../components/field/password';
import FieldInput from '../components/layout/field';
import SignHeaderLayout from '../components/layout/signHeader';
import { envs } from '../config';
import { paths } from '../paths';
import { makeRequest } from '../services/makeRequest';

interface Values {
    name: string;
    email: string;
    password: string;
}

function SignUp() {
    const navigate = useNavigate();
    const host = envs.userPath;

    const formInitialValues: Values = { name: '', password: '', email: '' };

    const handleValidationSchema = Yup.object().shape({
        ...emailYupValidations,
        ...nameYupValidations,
        ...passwordYupValidations,
    });

    const handleFormSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        setSubmitting(true);
        try {
            await makeRequest('POST', host, { data: values });
            navigate(paths.signIn);
        } catch (error: any) {
            if (error?.response?.status === 422) {
                toast.error('Email já cadastrado');
            } else {
                toast.error('Não foi possível criar a conta');
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
                    <div className="w-full h-full lg:h-screen flex flex-col-reverse lg:flex-row justify-center items-center lg:gap-28">
                        <div className="h-full w-full flex flex-1 justify-center lg:justify-end items-center py-5 lg:p-0">
                            <div className="max-w-3/4 lg:min-w-[480px] bg-white rounded-lg shadow-lg">
                                <Form className="flex justify-center items-center flex-col gap-3 lg:gap-8 p-10">
                                    <h4 className="w-full mb-4 text-3xl font-bold text-primaryDark">Crie sua conta</h4>

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

                                    <div className="w-full flex gap-4 items-center flex-col">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            disabled={isSubmitting}
                                            sx={{ width: '100%' }}
                                        >
                                            Criar
                                        </Button>

                                        <span>
                                            {`Já possui conta? `}
                                            <Link
                                                className="text-primaryMedium hover:text-primaryExtraLight font-semibold underline"
                                                to={paths.signIn}
                                            >
                                                Entrar
                                            </Link>
                                        </span>
                                    </div>
                                </Form>
                            </div>
                        </div>

                        <div className="h-full w-full flex flex-1 justify-center lg:justify-start items-center py-5 lg:p-0">
                            <SignHeaderLayout imageSrc={healthImage} />
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
}

export default SignUp;
