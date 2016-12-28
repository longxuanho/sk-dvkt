import { Injectable } from '@angular/core';

import { SuaChua, MaThietBi, TrangThaiSuaChua, DataModelSuaChuaSimple, DataModelTrangThaiChuanBiBG, DataModelTimeStamp, DataModelTrangThaiHoanThanh } from './sua-chua.model';

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

    setMetadata(rawData: SuaChua, options: { addNew?: boolean } = {}) {
        if (options && options.addNew) {
            if (!!this.auth.data)
                rawData.created_by = this.auth.data.$key;
            rawData.created_when = moment().format(dateTimeStringFormat);
        } else {
            if (!!this.auth.data)
                rawData.last_update_by = this.auth.data.$key;
            rawData.last_update_when = moment().format(dateTimeStringFormat);
        }
    }

    setTimeStamp(rawData: DataModelTimeStamp) {
        if (rawData.thoi_gian_bat_dau) {
            rawData.thoi_gian_bat_dau_str = this.dateTimeConverterService.from(rawData.thoi_gian_bat_dau, dateTimeDisplayFormat).convertToString();
            rawData.thoi_gian_bat_dau_unix = this.dateTimeConverterService.convertToUnix();
        }
        if (rawData.thoi_gian_ket_thuc_dk) {
            rawData.thoi_gian_ket_thuc_dk_str = this.dateTimeConverterService.from(rawData.thoi_gian_ket_thuc_dk, dateTimeDisplayFormat).convertToString();
            rawData.thoi_gian_ket_thuc_dk_unix = this.dateTimeConverterService.convertToUnix();
        }
        if (rawData.thoi_gian_ket_thuc) {
            rawData.thoi_gian_ket_thuc_str = this.dateTimeConverterService.from(rawData.thoi_gian_ket_thuc, dateTimeDisplayFormat).convertToString();
            rawData.thoi_gian_ket_thuc_unix = this.dateTimeConverterService.convertToUnix();

            rawData.thoi_gian_sua_chua = moment.duration(moment(rawData.thoi_gian_ket_thuc, dateTimeDisplayFormat).diff(moment(rawData.thoi_gian_bat_dau, dateTimeDisplayFormat))).asMilliseconds();
        }
    }

    transformBeforeAddnew(rawData: SuaChua) {
        this.setMetadata(rawData, { addNew: true });
        this.setTimeStamp(rawData);
    }

    transformBeforeUpdate(rawData: SuaChua) {
        // remove '$exists' and 'key' if it has any
        delete rawData['$exists'];
        delete rawData['$key'];
        this.setMetadata(rawData);
        this.setTimeStamp(rawData)
    }

    resolveTrangThaiChuanBiBGData(rawData: SuaChua): DataModelTrangThaiChuanBiBG {
        const { thoi_gian_ket_thuc_dk, thoi_gian_ket_thuc_dk_str, thoi_gian_ket_thuc_dk_unix, trang_thai, last_update_by, last_update_when } = rawData;
        return { thoi_gian_ket_thuc_dk, thoi_gian_ket_thuc_dk_str, thoi_gian_ket_thuc_dk_unix, trang_thai, last_update_by, last_update_when };
    } 

    resolveTrangThaiHoanThanhData(rawData: SuaChua): DataModelTrangThaiHoanThanh {
        const { thoi_gian_ket_thuc, thoi_gian_ket_thuc_str, thoi_gian_ket_thuc_unix, trang_thai, last_update_by, last_update_when } = rawData;
        return { thoi_gian_ket_thuc, thoi_gian_ket_thuc_str, thoi_gian_ket_thuc_unix, trang_thai, last_update_by, last_update_when };
    }

    resolveSimpleData(fullData: SuaChua): DataModelSuaChuaSimple {
        const { dv_quan_ly, khu_vuc, ma_thiet_bi, noi_dung, thoi_gian_bat_dau, thoi_gian_ket_thuc, thoi_gian_ket_thuc_dk, trang_thai, vi_tri } = fullData;

        let result = { dv_quan_ly, khu_vuc, ma_thiet_bi, noi_dung, thoi_gian_bat_dau, thoi_gian_ket_thuc, thoi_gian_ket_thuc_dk, trang_thai, vi_tri }
        // Filter kết quả khỏi các giá trị undefined không mong muốn
        Object.keys(result).forEach((key) => {
            if (!result[key])
                delete result[key];
        });

        return result;
    }




}