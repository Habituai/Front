import { Button, RadioGroup } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import { envs } from '../../config';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { User } from '../../pages/Dashboard';
import { makeRequestWithAuthorization } from '../../services/makeRequestWithAuthorization';
import ConfirmationPasswordField, { confirmationPasswordYupValidations } from '../field/confirmationPassword';
import EmailField, { emailYupValidations } from '../field/email';
import NameField, { nameYupValidations } from '../field/name';
import NewPasswordField, { newPasswordYupValidations } from '../field/newPassword';
import AvatarRadioButton, { avatars } from '../input/avatar';
import FieldInput from '../layout/field';

interface Values {
    name?: string;
    email?: string;
    password: string;
    passwordConfirmation: string;
    idAvatar?: number;
}

interface EditUserFormProps {
    userData: User;
    setOpenEditUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditUserForm({ setOpenEditUserModal, userData }: EditUserFormProps) {
    const { userPath } = envs;

    const { setUserHasUpdate } = useUpdateUser();

    const formInitialValues: Values = {
        name: userData.name,
        email: userData.email,
        password: '',
        passwordConfirmation: '',
        idAvatar: userData.idAvatar,
    };

    const handleValidationSchema = Yup.object().shape({
        ...emailYupValidations,
        ...nameYupValidations,
        ...newPasswordYupValidations,
        ...confirmationPasswordYupValidations,
    });

    const handleFormSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        setSubmitting(true);
        try {
            const data = {
                email: values.email !== formInitialValues.email ? values.email : undefined,
                name: values.name !== formInitialValues.name ? values.name : undefined,
                password: values.password ? values.password : undefined,
                idAvatar: values.idAvatar ? Number(values.idAvatar) : undefined,
            };

            await makeRequestWithAuthorization('PUT', `${userPath}/${userData.id}`, { data });

            toast.success('Seus dados foram atualizados!');
            setUserHasUpdate(true);

            values.password = ''; //Reseta a senha no formulário
            values.passwordConfirmation = ''; //Reseta a senha no formulário
        } catch (error) {
            toast.error('Não foi possível alterar');
            console.error(error);
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
            {({ values, errors, isSubmitting, setFieldValue }) => (
                <Form className="h-full w-full flex justify-center items-center flex-col gap-4 p-4 xl:p-10">
                    <h1 className="w-full mb-4 text-3xl font-bold text-primaryDark">Dados de perfil</h1>

                    <div className="flex xl:flex-row flex-col items-center justify-between gap-12">
                        <div className="h-full w-full flex flex-1 justify-center items-center flex-col gap-3 xl:gap-8 ">
                            <FieldInput name="name" type="text" fieldComponent={NameField} hasError={!!errors.name} />

                            <FieldInput
                                name="email"
                                type="email"
                                fieldComponent={EmailField}
                                hasError={!!errors.email}
                            />

                            <div className="w-full flex flex-col xl:flex-row gap-3 xl:gap-8">
                                <FieldInput
                                    name="password"
                                    type="password"
                                    fieldComponent={NewPasswordField}
                                    hasError={!!errors.password}
                                />

                                <FieldInput
                                    name="passwordConfirmation"
                                    type="password"
                                    fieldComponent={ConfirmationPasswordField}
                                    hasError={!!errors.passwordConfirmation}
                                />
                            </div>
                        </div>

                        <div className="w-full h-full flex flex-1 flex-col justify-center items-center text-lg xl:text-xl gap-4">
                            <h3 className="font-bold">Avatar</h3>

                            <div className="w-full xl:max-w-[720px] flex flex-wrap justify-between items-center gap-4">
                                <RadioGroup
                                    row
                                    name="idAvatar"
                                    value={values.idAvatar}
                                    onChange={(event) => {
                                        setFieldValue('idAvatar', event.currentTarget.value);
                                    }}
                                    className="h-full w-full flex flex-wrap justify-center items-center"
                                >
                                    {avatars.map((avatar, index) => {
                                        return <AvatarRadioButton key={index} value={index + 1} image={avatar} />;
                                    })}
                                </RadioGroup>
                            </div>
                        </div>
                    </div>

                    <div className="w-full mt-12 flex xl:gap-10 gap-4 xl:flex-row flex-col">
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isSubmitting || JSON.stringify(formInitialValues) === JSON.stringify(values)}
                            sx={{ width: '100%' }}
                        >
                            Atualizar dados
                        </Button>

                        <Button
                            variant="outlined"
                            color="ruim"
                            size="large"
                            disabled={isSubmitting}
                            onClick={() => setOpenEditUserModal(false)}
                            sx={{ width: '100%' }}
                        >
                            Voltar
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
