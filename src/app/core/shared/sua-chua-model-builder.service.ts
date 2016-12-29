import { Injectable } from '@angular/core';

import { SuaChua, MaThietBi, TrangThaiSuaChua, DataModelSuaChuaSimple, DataModelSuaChuaTrangThai, DataModelTimeStamp } from './sua-chua.model';

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

    resolveUpdateBasicInfoData(rawData: SuaChua) {
        let omitKeys: string[] = ['$exists', '$key'];
        omitKeys.forEach(omitKey => {
            delete rawData[omitKey];
        });
        return rawData;
    }

    resolveTrangThaiData(rawData: SuaChua, options: { trang_thai?: number } = {}) {
        let keys: string[] = [];
        let result: DataModelSuaChuaTrangThai = {};
        if (options.trang_thai === TrangThaiSuaChua.HoanThanh)
            keys = ['thoi_gian_ket_thuc', 'thoi_gian_ket_thuc_str', 'thoi_gian_ket_thuc_unix', 'trang_thai', 'last_update_by', 'last_update_when' ];
        if (options.trang_thai === TrangThaiSuaChua.DangThucHien || options.trang_thai === TrangThaiSuaChua.ChuanBiBanGiao)
            keys = ['thoi_gian_ket_thuc_dk', 'thoi_gian_ket_thuc_dk_str', 'thoi_gian_ket_thuc_dk_unix', 'trang_thai', 'last_update_by', 'last_update_when' ];
        keys.forEach(key => {
            if (rawData[key] !== undefined)
                Object.assign(result, { [key]: rawData[key] });
        });
        return result;
    }

    resolveSimpleData(fullData: SuaChua): DataModelSuaChuaSimple {
        let result: DataModelSuaChuaSimple | {} = {};
        let keys: string[] = [ 'loai_sua_chua', 'dv_quan_ly', 'khu_vuc', 'ma_thiet_bi', 'noi_dung', 'thoi_gian_bat_dau', 'thoi_gian_ket_thuc', 'thoi_gian_ket_thuc_dk', 'thoi_gian_sua_chua', 'trang_thai', 'vi_tri' ];
        keys.forEach(key => {
            if (fullData[key] !== undefined)
                Object.assign(result, { [key]: fullData[key] });
        });
        return <DataModelSuaChuaSimple>result;
    }




}