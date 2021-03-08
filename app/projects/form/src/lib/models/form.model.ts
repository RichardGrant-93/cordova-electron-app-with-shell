export interface Form {
    fields: [FormField<any>]
}

export enum FormInputType{
    AUTO_COMPLETE_TEXT_INPUT
}

export interface Lookup<T1>{
    id: string | number; //id may be guid or integer
    value: T1
}

export interface FormField<T1>{
    inputType: FormInputType;
    defaultValue?: Lookup<T1>;
    placeholder?: string;
    options?: Lookup<T1>[];
    name: string;
    col?: number
}