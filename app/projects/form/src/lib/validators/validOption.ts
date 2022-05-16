import { AbstractControl } from '@angular/forms';
import { Lookup } from '../models/form.model';

/**
 * 
 * @param options All possible values of control
 * @param isRequired value is required
 * @parm mustBeValidOption value must be within options
 */
export function validOption<T1>(options: Lookup<T1>[], isRequired: boolean, mustBeValidOption: boolean) {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = (control.value as Lookup<string>);
        const test = value?.value || '';
          if(value === null && isRequired)
            return {valueIsNull: true};
          const contains = options.filter((option)=>{
            return option.value.toString().toLowerCase().indexOf(test.toString().toLowerCase()) !== -1;
          });
          if (contains.length === 0 && mustBeValidOption) {
              return {valueNotInOptions: true};
          }
          return null;
    };
}
