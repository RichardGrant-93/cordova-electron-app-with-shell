import { AbstractControl } from '@angular/forms';
import { Lookup } from '../models/form.model';

/**
 * 
 * @param options All possible values of control
 * @param isRequired value is required
 * @parm regex value must pass
 */
export function validText<T1>(isRequired: boolean, regex: RegExp = null) {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = (control.value as string);
        const test = value || '';

        let failedReasons = {};
        if(test.length === 0 && !isRequired)
          return null;
        
        if(test.length > 0 && isRequired)
          failedReasons['valueIsRequired'] = true;
        if(regex && !regex.test(test)){
          failedReasons['regexFailed'] = true;
        }

        return Object.keys(failedReasons).length > 0? failedReasons : null;
    };
}
