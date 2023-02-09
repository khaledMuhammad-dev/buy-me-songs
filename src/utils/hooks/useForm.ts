import { useState } from "react";


export interface IFormFields {
    [key: string]: any
}
export type IHandleChange = (e: React.ChangeEvent<HTMLInputElement> | "reset") => void
type IUseForm = (init: IFormFields) => [IFormFields, IHandleChange]

export const useForm: IUseForm = (initialState) => {
    const [fields, setFields] = useState(initialState);

    const handleChange: IHandleChange = (e) => {
        if(e === "reset") {
            setFields(initialState);
            return
        }

        const value = e.target.value;
        const fieldName = e.target.name;

        setFields({ ...fields, [fieldName]: value });
    };

    return [fields, handleChange]

}



// handle validation
interface ISchema {
    [key: string]: {
        required: [boolean, string];
        regex: [any, string];
    }
}

export type ICheckValidition = (fieldName: string, value: string) => boolean;
type IUseValidation = (fields: IFormFields, schema: ISchema) => [IFormFields, ICheckValidition];
export const useValidation: IUseValidation = (fields, schema) => {
    const [errors, setErrors] = useState(fields);

    const checkValidation = (fieldName: string, value: string) => {
        const required = schema[fieldName].required;

        if (!value.trim() && required[0]) {
            setErrors({ ...errors, [fieldName]: required[1] });
            return false;
        }

        const regex = schema[fieldName].regex;
        if (regex && !regex[0].test(value)) {
            setErrors({ ...errors, [fieldName]: regex[1] });
            return false;
        }

        setErrors({ ...errors, [fieldName]: "" });
        return true;
    };


    return [errors, checkValidation]
}