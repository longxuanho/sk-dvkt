import { Pipe, PipeTransform } from '@angular/core';

declare var moment: any;

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: string, inputFormat: string, outputFormat: string = 'fromNow'): string {
    if (value) {
      if (inputFormat && outputFormat === 'fromNow')
        return moment(value, inputFormat).fromNow();
      if (inputFormat && outputFormat)
        return moment(value, inputFormat).format(outputFormat);
    }
    return null;
  }

}
