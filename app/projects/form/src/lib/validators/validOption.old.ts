import { AbstractControl } from '@angular/forms';
import { Lookup } from '../models/form.model';

/**
 * 
 * @param validOptions All possible values of control
 */
export function validateValueWithList<T1>(validOptions: Lookup<T1>[]) {
    return (control: AbstractControl): { [key: string]: any } | null => {

        let validation: { [key: string]: any } = {};
        let controlValue = control.value;
        if (!controlValue) {
            return null;
        }

        let match: Lookup<T1>[] = [];
        if(validOptions.length < 0)
            validation.noValidOptions = true;

        if(typeof validOptions[0].value === typeof String()){
            if(typeof controlValue === typeof String()){
                const testValue: string = controlValue.toString().toLowerCase();
                match = validOptions.filter((option: Lookup<T1>) => {
                    return (option.value).toString().toLowerCase().indexOf(testValue) > -1;
                });
            }else if(typeof controlValue.value === typeof String()){ //controlValue is an object so if it has .value use that to test
                const testValue: string = controlValue.value.toString().toLowerCase();
                match = validOptions.filter((option: Lookup<T1>) => {
                    return (option.value).toString().toLowerCase().indexOf(testValue) > -1;
                });
            }else{
                validation.controlValueTypeDoesNotMatchValidOptions = true;
            }
        }else{ //validOptions value is Object so check if objects matches controlValue
            const testValue: T1 = controlValue;
            match = validOptions.filter((option: Lookup<T1>) => {
                return option.value === testValue;
            });
        }
    
        if(match.length === 0)
            validation.noMatches = true;

        return Object.keys(validation).length > 0? validation : null;
    };
}
