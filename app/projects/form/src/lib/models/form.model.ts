import { Observable } from "rxjs";

export interface Form {
    fields: [FormField<any> | ComponentField<any>];
    index: number;
}

export enum FormInputType{
    AUTO_COMPLETE_TEXT_INPUT,
    CHIPS,
    SWITCH,
    TEXT_INPUT,
    TEXT_INPUT_NUMBER,
    CUSTOM
}

export interface Lookup<T1>{
    id: string | number; //id may be guid or integer
    value: T1
}

export interface FormField<T1>{
    inputType: FormInputType;
    defaultValue?: Lookup<T1> | T1 | Lookup<T1>[];
    placeholder?: string;
    options?: Lookup<T1>[];
    name: string;
    col?: number
}

export interface ComponentField<T>{
    inputType: FormInputType;
    parameters: T;
    col?: number
}