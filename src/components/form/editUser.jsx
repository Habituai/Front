import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { makeRequestWithAuthorization } from "../../services/makeRequest";
import EmailField, { emailYupValidations } from "../field/email";
import NameField, { nameYupValidations } from "../field/name";
import NewPasswordField, {
    newPasswordYupValidations,
} from "../field/newPassword";
import FieldInput from "../layout/field";

export default function EditUserForm({ setOpenEditUserModal, userData }) {
    const host = import.meta.env.VITE_USER_PATH;

    const { setUserHasUpdate } = useUpdateUser();

    const formInitialValues = {
        id: -1,
        name: userData.name,
        email: userData.email,
        password: "",
    };

    const handleValidationSchema = Yup.object().shape({
        ...emailYupValidations,
        ...nameYupValidations,
        ...newPasswordYupValidations,
    });

    const handleFormSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const data = {
                email:
                    values.email !== formInitialValues.email
                        ? values.email
                        : undefined,
                name:
                    values.name !== formInitialValues.name
                        ? values.name
                        : undefined,
                password: !!values.password ? values.password : undefined,
            };
            console.log(data);

            await makeRequestWithAuthorization(
                "PUT",
                `${host}/${userData.id}`,
                { data }
            );

            toast.success("Seus dados foram atualizados!");
            setUserHasUpdate(true);

            values.password = ""; //Reseta a senha no formulário
        } catch (error) {
            toast.error("Não foi possível alterar");
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
            {({ values, errors, isSubmitting }) => (
                <Form className="h-full w-full flex justify-center items-center flex-col gap-3 lg:gap-8 p-10">
                    <h4 className="w-full mb-4 text-3xl font-bold text-primaryDark">
                        Dados de perfil
                    </h4>

                    <div className="w-full flex flex-col lg:flex-row gap-3 lg:gap-8">
                        <FieldInput
                            name="name"
                            type="text"
                            label="Nome/Apelido"
                            fieldComponent={NameField}
                            hasError={!!errors.name}
                        />

                        <FieldInput
                            name="email"
                            type="email"
                            fieldComponent={EmailField}
                            hasError={!!errors.email}
                        />
                    </div>

                    <FieldInput
                        name="password"
                        type="password"
                        fieldComponent={NewPasswordField}
                        hasError={!!errors.password}
                    />

                    <div className="w-full mt-8 flex lg:gap-10 gap-4 lg:flex-row flex-col">
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={
                                isSubmitting ||
                                JSON.stringify(formInitialValues) ===
                                    JSON.stringify(values)
                            }
                            sx={{ width: "100%" }}
                        >
                            Atualizar dados
                        </Button>

                        <Button
                            variant="outlined"
                            color="ruim"
                            size="large"
                            disabled={isSubmitting}
                            onClick={() => setOpenEditUserModal(false)}
                            sx={{ width: "100%" }}
                        >
                            Voltar
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
