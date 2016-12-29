import { Pipe, PipeTransform } from '@angular/core';

declare var moment: any;

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number, format: string = 'humanize'): string {
    if (format === 'humanize')
      return moment.duration(value).humanize();
    if (format === 'years')
      return moment.duration(value).asYears();
    if (format === 'months')
      return moment.duration(value).asMonths();
    if (format === 'weeks')
      return moment.duration(value).asWeeks();
    if (format === 'days')
      return moment.duration(value).asDays();
    if (format === 'hours')
      return moment.duration(value).asHours();
    if (format === 'minutes')
      return moment.duration(value).asMinutes();
    return null;
  }

}
