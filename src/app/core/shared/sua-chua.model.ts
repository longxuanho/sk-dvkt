export const refSuaChuas = {
    suaChuasList: '/sua-chuas',
    suaChuasCurrent: '/sua-chuas-current',
    zone: '/cla-pxoto'
}

export enum TrangThaiSuaChua {
    DangThucHien = 0,
    ChuanBiBanGiao = 1,
    HoanThanh = 2
}

export class SuaChua {
    $key?: string;
    location_id?: string;
    khu_vuc: string;
    vi_tri: string;
    loai_sua_chua?: string;
    loai_thiet_bi?: string;
    ma_thiet_bi: string;
    hang_san_xuat?: string;
    dv_quan_ly: string;
    ma_wo?: string;
    noi_dung: string;
    thoi_gian_bat_dau: string;
    thoi_gian_bat_dau_str?: string;
    thoi_gian_bat_dau_unix?: number;
    thoi_gian_ket_thuc_dk: string;
    thoi_gian_ket_thuc_dk_str?: string;
    thoi_gian_ket_thuc_dk_unix?: number;
    thoi_gian_ket_thuc?: string;
    thoi_gian_ket_thuc_str?: string;
    thoi_gian_ket_thuc_unix?: number;
    trang_thai?: number;
    created_by_name?: string;
    created_by_email?: string;
    created_by?: string;
    created_when?: string;
    last_update_by_name?: string;
    last_update_by_email?: string;
    last_update_by?: string;
    last_update_when?: string;
}

export class LoaiSuaChua {
    loaiSuaChua: string;
}

export class LoaiThietBi {
    loaiThietBi: string;
}

export class KhuVuc {
    khuVuc: string;
}

export class ViTri {
    khuVuc: string;
    viTri: string;
}

export class MaThietBi {
    loaiThietBi: string;
    maThietBi: string;
    hangSanXuat: string;
    dvQuanLy: string;
}