import { Button } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { envs } from '../../config';
import { paths } from '../../paths';
import { makeRequest } from '../../services/makeRequest';
import ConfirmationPasswordField, { confirmationPasswordYupValidations } from '../field/confirmationPassword';
import EmailField, { emailYupValidations } from '../field/email';
import NameField, { nameYupValidations } from '../field/name';
import PasswordField, { passwordYupValidations } from '../field/password';
import FieldInput from '../layout/field';

interface Values {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    idAvatar: number;
}

export default function CreateUserForm() {
    const navigate = useNavigate();
    const host = envs.userPath;

    const formInitialValues: Values = { name: '', email: '', password: '', passwordConfirmation: '', idAvatar: 1 };

    const handleValidationSchema = Yup.object().shape({
        ...emailYupValidations,
        ...nameYupValidations,
        ...passwordYupValidations,
        ...confirmationPasswordYupValidations,
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
        <Formik
            initialValues={formInitialValues}
            validationSchema={handleValidationSchema}
            onSubmit={handleFormSubmit}
            validateOnChange={false}
            validateOnBlur={false}
        >
            {({ errors, isSubmitting }) => (
                <Form className="flex justify-center items-center flex-col gap-3 xl:gap-8 py-6 px-10 xl:p-10">
                    <h4 className="w-full mb-4 text-3xl font-bold text-primaryDark">Crie sua conta</h4>

                    <FieldInput name="name" type="text" fieldComponent={NameField} hasError={!!errors.name} />

                    <FieldInput name="email" type="email" fieldComponent={EmailField} hasError={!!errors.email} />

                    <FieldInput
                        name="password"
                        type="password"
                        fieldComponent={PasswordField}
                        hasError={!!errors.password}
                    />

                    <FieldInput
                        name="passwordConfirmation"
                        type="password"
                        fieldComponent={ConfirmationPasswordField}
                        hasError={!!errors.passwordConfirmation}
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
            )}
        </Formik>
    );
}
