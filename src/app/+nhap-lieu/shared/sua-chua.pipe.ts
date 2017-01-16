import { Pipe, PipeTransform } from '@angular/core';
import { SuaChua } from '../../core/shared/sua-chua.model';
import * as _ from 'lodash';

@Pipe({
  name: 'suaChua'
})
export class SuaChuaPipe implements PipeTransform {

  transform(value: SuaChua[], searchString: string): any {
    return _.filter(value, (suachuaObj) => {
      if (suachuaObj && suachuaObj.ma_thiet_bi)
        return suachuaObj.ma_thiet_bi.search(searchString) >= 0;
      return false;
    });
  }

}

