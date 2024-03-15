/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ListUpdateFormInputValues = {
    title?: string;
    description?: string;
    imageKey?: string;
    slug?: string;
};
export declare type ListUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    imageKey?: ValidationFunction<string>;
    slug?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ListUpdateFormOverridesProps = {
    ListUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    imageKey?: PrimitiveOverrideProps<TextFieldProps>;
    slug?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ListUpdateFormProps = React.PropsWithChildren<{
    overrides?: ListUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    list?: any;
    onSubmit?: (fields: ListUpdateFormInputValues) => ListUpdateFormInputValues;
    onSuccess?: (fields: ListUpdateFormInputValues) => void;
    onError?: (fields: ListUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ListUpdateFormInputValues) => ListUpdateFormInputValues;
    onValidate?: ListUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ListUpdateForm(props: ListUpdateFormProps): React.ReactElement;
