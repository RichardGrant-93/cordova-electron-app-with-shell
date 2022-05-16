export enum AdvancedTypes{
    MONEY,
    LINK,
    CHIP,
    LIST,
    TEXT
};
  
export interface AdvancedType<T1>{
    type: AdvancedTypes,
    value: T1
};
  