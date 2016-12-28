import { Injectable } from '@angular/core';

import { SuaChua, MaThietBi, TrangThaiSuaChua, DataModelSuaChuaCurrent, DataModelTrangThaiChuanBiBG, DataModelTimeStamp } from './sua-chua.model';

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

    setMetadata(rawData: SuaChua, options: string = 'create') {
        if (options === 'create') {
            if (!!this.auth.data) {
                rawData.created_by = this.auth.data.$key;
                rawData.created_by_name = this.auth.data.displayName;
                rawData.created_by_email = this.auth.data.email;
            }
            rawData.created_when = moment().format(dateTimeStringFormat);
        } else {
            if (!!this.auth.data) {
                rawData.last_update_by = this.auth.data.$key;
                rawData.last_update_by_name = this.auth.data.displayName;
                rawData.last_update_by_email = this.auth.data.email;
            }
            rawData.last_update_when = moment().format(dateTimeStringFormat);
        }
    }

    setTimeStamp(rawData: DataModelTimeStamp) {
        rawData.thoi_gian_bat_dau_str = this.dateTimeConverterService.from(rawData.thoi_gian_bat_dau, dateTimeDisplayFormat).convertToString();
        rawData.thoi_gian_bat_dau_unix = this.dateTimeConverterService.convertToUnix();
        rawData.thoi_gian_ket_thuc_dk_str = this.dateTimeConverterService.from(rawData.thoi_gian_ket_thuc_dk, dateTimeDisplayFormat).convertToString();
        rawData.thoi_gian_ket_thuc_dk_unix = this.dateTimeConverterService.convertToUnix();
        if (rawData.thoi_gian_ket_thuc) {
            rawData.thoi_gian_ket_thuc_str = this.dateTimeConverterService.from(rawData.thoi_gian_ket_thuc, dateTimeDisplayFormat).convertToString();
            rawData.thoi_gian_ket_thuc_unix = this.dateTimeConverterService.convertToUnix();
        }
    }

    transformBeforeAddnew(rawData: SuaChua) {
        this.setMetadata(rawData, 'create');
        this.setTimeStamp(rawData);
    }

    transformBeforeUpdate(rawData: SuaChua) {
        // remove '$exists' and 'key' if it has any
        delete rawData['$exists'];
        delete rawData['$key'];
        this.setMetadata(rawData, 'update');
        this.setTimeStamp(rawData)
    }

    resolveSyncData(rawData): DataModelSuaChuaCurrent {
        let { vi_tri, khu_vuc, ma_thiet_bi, dv_quan_ly, noi_dung, thoi_gian_bat_dau, thoi_gian_ket_thuc_dk, trang_thai } = rawData;
        return { vi_tri, khu_vuc, ma_thiet_bi, dv_quan_ly, noi_dung, thoi_gian_bat_dau, thoi_gian_ket_thuc_dk, trang_thai };
    }

    transformBeforeUpdateTrangThaiChuanBiBG(rawData: DataModelTimeStamp, duration: number) {
        const thoiGianKetThucDK = moment(rawData.thoi_gian_bat_dau, dateTimeDisplayFormat).add(duration, 'minutes');        

        if (thoiGianKetThucDK.isValid()) {
            rawData.thoi_gian_ket_thuc_dk = thoiGianKetThucDK.format(dateTimeDisplayFormat);
            this.setTimeStamp(rawData);
        }
        delete rawData.thoi_gian_bat_dau;
        delete rawData.thoi_gian_bat_dau_str;
        delete rawData.thoi_gian_bat_dau_unix;
        rawData.trang_thai = TrangThaiSuaChua.ChuanBiBanGiao
    }




}