import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterArrayOfObjects',
    pure: false
  })
  export class filterArrayOfObjects  implements PipeTransform {
    transform(obj, fieldName: string, test: string) {
        return obj.filter(item => {
            return item[fieldName].toString().toLowerCase().indexOf(test.toLowerCase()) !== -1;
        });
    }
  }