import { Pipe, PipeTransform } from '@angular/core';
import { MaThietBi } from '../../core/shared/sua-chua.model';
import * as _ from 'lodash';

@Pipe({
  name: 'maThietBi'
})
export class MaThietBiPipe implements PipeTransform {

  transform(value: MaThietBi[], searchString: string): any {
    return _.filter(value, (mathietbiObj) => {
      if (mathietbiObj && mathietbiObj.maThietBi)
        return mathietbiObj.maThietBi.search(searchString) >= 0;
      return false;
    });
  }

}

