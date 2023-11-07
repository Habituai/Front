import { Button } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { envs } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import { paths } from '../../paths';
import { makeRequest } from '../../services/makeRequest';
import EmailField, { emailYupValidations } from '../field/email';
import PasswordField, { passwordYupValidations } from '../field/password';
import FieldInput from '../layout/field';

interface Values {
    email: string;
    password: string;
}

export default function LoginForm() {
    const host = envs.loginPath;
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const formInitialValues: Values = { email: '', password: '' };

    const handleValidationSchema = Yup.object().shape({
        ...emailYupValidations,
        ...passwordYupValidations,
    });

    const handleFormSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        setSubmitting(true);
        try {
            const data = await makeRequest('POST', host, { data: values });
            Cookies.set('token', data.token);
            setAuth(true);
            navigate(paths.dashboard);
        } catch (error) {
            toast.error('Email ou senha incorretos');
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
                    <Form className="flex justify-center items-center flex-col gap-3 xl:gap-8 p-10">
                        <h4 className="w-full mb-4 text-3xl font-bold text-primaryDark">Faça seu login</h4>

                        <FieldInput name="email" type="email" fieldComponent={EmailField} hasError={!!errors.email} />

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
                                Entrar
                            </Button>

                            <span>
                                {`Não possui conta? `}
                                <Link
                                    className="text-primaryMedium hover:text-primaryExtraLight font-semibold underline"
                                    to={paths.signUp}
                                >
                                    Cadastrar
                                </Link>
                            </span>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}
