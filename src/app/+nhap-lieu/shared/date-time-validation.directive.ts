import { ValidatorFn, AbstractControl } from '@angular/forms';
import { dateTimeDisplayFormat, dateTimeStringFormat } from '../../core/shared/date-time-format.model';

declare var moment: any;

/** Thời gian (String) phải hợp lệ để chuyển đổi sang DateTime - Ref: https://angular.io/docs/ts/latest/cookbook/form-validation.html#!#reactive */
export function dateTimeValidator(dateTimeFormat: string = dateTimeDisplayFormat): ValidatorFn {
  
  return (control: AbstractControl): {[key: string]: any} => {
    const dateTime = control.value;
    const no = !moment(dateTime, dateTimeFormat).isValid();
    return no ? {'dateTimeInvalid': {dateTime}} : null;
  };
}

export function dateTimeRangeValidator(fromDateTime: any, dateTimeFormat: string = dateTimeDisplayFormat): ValidatorFn {
  
  return (control: AbstractControl): {[key: string]: any} => {
    const dateTime = moment(control.value, dateTimeFormat);
    const no = !dateTime.isValid() || !fromDateTime.isValid() || dateTime.diff(fromDateTime) <= 0;
    return no ? {'dateTimeRangeInvalid': true} : null;
  };
}