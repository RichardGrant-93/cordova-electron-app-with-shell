import { Pipe, PipeTransform } from "@angular/core";
import { Lookup } from "../models/form.model";

@Pipe({
    name: 'filterArrayOfObjects',
    pure: false
  })
  export class filterArrayOfObjects  implements PipeTransform {
    /**
     * Filter array of objects used for autoComplete in [[FormComponent]]
     * @param obj ArrayOfObjects to filter
     * @param fieldName fieldName to filter by
     * @param test partial string to check if exists in array of objects.
     * @returns 
     */
    transform(obj: Lookup<string>[], fieldName: string, test: string) {
        return obj.filter(item => {
            return item[fieldName].toString().toLowerCase().indexOf(test.toLowerCase()) !== -1;
        });
    }
  }