export const refSuaChuas = {
    suaChuasList: '/sua-chuas',
    suaChuasCurrent: '/sua-chuas-current',
    zone: '/cla-pxoto'
  }

export class SuaChua {
  $key?: string;
  location_id: string;
  khu_vuc: string;
  vi_tri: string;
  loai_sua_chua: string;
  loai_thiet_bi: string;
  ma_thiet_bi: string;
  ma_wo: string;
  noi_dung: string;
  thoi_gian_bat_dau: string;  
  thoi_gian_bat_dau_str?: string;
  thoi_gian_bat_dau_unix?: number;
  thoi_gian_ket_thuc_dk: string;
  thoi_gian_ket_thuc_dk_str?: string;  
  thoi_gian_ket_thuc_dk_unix?: number;
  trang_thai: string;
  
}