import { ErrorMessage, Field } from "formik";

export default function FieldInput({ fieldComponent, name, type, hasError }) {
    return (
        <div className="w-full flex flex-col">
            <Field
                as={fieldComponent}
                name={name}
                type={type}
                error={hasError}
            />
            <span className="text-red-600">
                <ErrorMessage name={name} />
            </span>
        </div>
    );
}
