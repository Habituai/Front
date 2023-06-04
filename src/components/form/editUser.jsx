import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import EmailField, { emailYupValidations } from "../field/email";
import NameField, { nameYupValidations } from "../field/name";
import PasswordField from "../field/password";
import FieldInput from "../layout/field";

export default function EditUserForm({ setOpenEditUserModal, userData }) {
    const host = import.meta.env.VITE_USER_PATH;

    const { setUserHasUpdate } = useUpdateUser();

    const formInitialValues = {
        name: userData.name,
        email: userData.email,
        password: "",
    };

    const handleValidationSchema = Yup.object().shape({
        ...emailYupValidations,
        ...nameYupValidations,
        password: Yup.string()
            .min(2, "Senha inválida")
            .max(20, "Senha inválida")
            .trim("Senha inválida"),
    });

    const handleFormSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            await makeRequestWithAuthorization("POST", host, { data: values });
            toast.success("Seus dados foram editados com sucesso!");
            setUserHasUpdate(true);
        } catch (error) {
            toast.error("Não foi possível editar seus dados");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Formik
                initialValues={formInitialValues}
                validationSchema={handleValidationSchema}
                onSubmit={handleFormSubmit}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({ values, errors, isSubmitting }) => (
                    <Form className="flex justify-center items-center flex-col gap-3 lg:gap-8 p-10">
                        <h4 className="w-full mb-4 text-3xl font-bold text-primaryDark">
                            Seus dados de perfil
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
                                Editar dados
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
        </>
    );
}
