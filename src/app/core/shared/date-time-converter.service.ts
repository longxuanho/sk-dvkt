import { Injectable } from '@angular/core';
import { dateTimeDisplayFormat, dateTimeStringFormat } from './date-time-format.model';

declare var moment: any;

@Injectable()
export class DateTimeConverterService {

  timeStampAsMoment: any;
  constructor() {
  }

  from(timeStamp: string, format: string) {
    this.timeStampAsMoment = moment(timeStamp, format);
    return this; 
  }

  convertToString(): string {
    return !!this.timeStampAsMoment ? this.timeStampAsMoment.format(dateTimeStringFormat) : '';
  }

  convertToUnix(): string {
    return !!this.timeStampAsMoment ? this.timeStampAsMoment.valueOf() : '';
  }

  convertToDisplay(): string {
    return !!this.timeStampAsMoment ? this.timeStampAsMoment.format(dateTimeDisplayFormat) : '';
  }

}