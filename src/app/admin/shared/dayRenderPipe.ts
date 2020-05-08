import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dayRenderPipe'
})
export class DayRenderPipe implements PipeTransform {

  transform(value: number): any {
    if (value < 0) {
      return 'in ' + -value + ' Tagen';
    } else if (value === 0) {
      return 'heute';
    } else {
      return 'vor ' + value + ' Tagen';
    }
  }

}
