import { Component, OnInit, OnDestroy } from '@angular/core';
import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { SuaChua, TrangThaiSuaChua } from '../../core/shared/sua-chua.model';
import { dateTimeDisplayFormat } from '../../core/shared/date-time-format.model';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'sk-nhap-lieu-list-dang-thuc-hien',
  templateUrl: './nhap-lieu-list-dang-thuc-hien.component.html',
  styleUrls: ['./nhap-lieu-list-dang-thuc-hien.component.scss']
})
export class NhapLieuListDangThucHienComponent implements OnInit {

  suachuasSub: Subscription;
  suachuas: SuaChua[] = [];
  trangThaiSuaChua: any;
  dateTimeDisplayFormat: string;

  constructor(
    private suaChuaService: SuaChuaService,
    private toastrService: ToastrService
  ) {
    this.trangThaiSuaChua = TrangThaiSuaChua;
    this.dateTimeDisplayFormat = dateTimeDisplayFormat;
  }

  ngOnInit() {
    this.suachuasSub = this.suaChuaService.getSuaChuasCurrent().subscribe(
      snapshots => {
        this.suachuas = <SuaChua[]>snapshots;
      }, (error: Error) => this.toastrService.error(`Không thể truy vấn dữ liệu. ${error.message}`, 'Opps!')
    )
  }

  ngOnDestroy() {
    if (this.suachuasSub)
      this.suachuasSub.unsubscribe();
  }

}
