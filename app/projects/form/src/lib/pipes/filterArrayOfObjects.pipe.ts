import { Pipe, PipeTransform } from "@angular/core";
import { Lookup } from "../models/form.model";

@Pipe({
    name: 'filterArrayOfObjects',
    pure: false
  })
  export class FilterArrayOfObjects  implements PipeTransform {
    /**
     * Filter array of objects used for autoComplete in [[FormComponent]]
     * @param obj ArrayOfObjects to filter
     * @param fieldName fieldName to filter by
     * @param test partial string to check if exists in array of objects.
     * @returns 
     */
    transform(obj: Lookup<string>[], fieldName: string, test: string) {
        test = test.toLowerCase();
        const exactMatchesFilter = (val) => val.value.toLowerCase() === test;
        const exectMatches = obj.filter(exactMatchesFilter).sort((a, b) => a.value.localeCompare(b.value));

        const beginningMatchesFilter = (val) => {
          const notExactMatchesFilter = !exactMatchesFilter(val);
          return val.value.toLowerCase().startsWith(test) && notExactMatchesFilter;
        };
        const beginningMatches = obj.filter(beginningMatchesFilter).sort((a, b) => a.value.localeCompare(b.value));
        
        const partialMatchesFilter = (val) => {
          const notExactMatchesFilter = !exactMatchesFilter(val);
          const notBeginningMatchesFilter = !beginningMatchesFilter(val);
          return val.value.toLowerCase().includes(test) && notExactMatchesFilter && notBeginningMatchesFilter;
        };
        const partialMatches = obj.filter(partialMatchesFilter).sort((a, b) => a.value.localeCompare(b.value));
        return [...exectMatches, ...beginningMatches, ...partialMatches];
    }
  }