export enum Action{
    BUTTON,
    FORM_CHANGE
};

export interface ActionEmit<T1>{
    action?: string;
    actionType: Action;
    form: T1;
}