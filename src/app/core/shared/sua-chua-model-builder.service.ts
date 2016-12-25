import { Injectable } from '@angular/core';

import { SuaChua, MaThietBi } from './sua-chua.model';

import { AuthService } from './auth.service';
import { UserProfile } from './user-profile.model';
import { dateTimeStringFormat, dateTimeDisplayFormat } from './date-time-format.model';
import { DateTimeConverterService } from './date-time-converter.service';

declare var moment: any;

@Injectable()
export class SuaChuaModelBuilderService {

    auth: { data: UserProfile | null };

    constructor(
        private authService: AuthService,
        private dateTimeConverterService: DateTimeConverterService
    ) {
        this.auth = this.authService.getAuthProfile();
    }

    flattenFields(rawData: { ma_thiet_bi: MaThietBi; }) {
        const { maThietBi, dvQuanLy, hangSanXuat } = rawData.ma_thiet_bi;
        Object.assign(rawData, { ma_thiet_bi: maThietBi, dv_quan_ly: dvQuanLy, hang_san_xuat: hangSanXuat });
    }

    setMetadata(rawData: SuaChua) {
        if (!!this.auth.data) {
            rawData.created_by = this.auth.data.$key;
            rawData.created_by_name = this.auth.data.displayName;
            rawData.created_by_email = this.auth.data.email;
        }
        rawData.created_when = moment().format(dateTimeStringFormat);
    }

    transformBeforeSubmit(rawData: SuaChua) {
        this.setMetadata(rawData);
        rawData.thoi_gian_bat_dau_str = this.dateTimeConverterService.from(rawData.thoi_gian_bat_dau, dateTimeDisplayFormat).convertToString();
        rawData.thoi_gian_bat_dau_unix = this.dateTimeConverterService.convertToUnix();
        rawData.thoi_gian_ket_thuc_dk_str = this.dateTimeConverterService.from(rawData.thoi_gian_ket_thuc_dk, dateTimeDisplayFormat).convertToString();
        rawData.thoi_gian_ket_thuc_dk_unix = this.dateTimeConverterService.convertToUnix();
    }

    transformBeforeSync(rawData: SuaChua) {
        const { vi_tri, khu_vuc, ma_thiet_bi, dv_quan_ly, noi_dung, thoi_gian_bat_dau_str, thoi_gian_ket_thuc_dk_str } = rawData;
        return { vi_tri, khu_vuc, ma_thiet_bi, dv_quan_ly, noi_dung, thoi_gian_bat_dau_str, thoi_gian_ket_thuc_dk_str };
    }




}