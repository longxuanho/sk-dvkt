import { Component, OnInit, OnDestroy } from '@angular/core';
import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { SuaChua, TrangThaiSuaChua } from '../../core/shared/sua-chua.model';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'sk-nhap-lieu-list',
  templateUrl: './nhap-lieu-list.component.html',
  styleUrls: ['./nhap-lieu-list.component.scss']
})
export class NhapLieuListComponent implements OnInit {

  subscriptions: { suachuas?: Subscription } = {}
  suachuas: SuaChua[] = [];
  trangThaiSuaChua: any;
  componentDisplayed: number = TrangThaiSuaChua.DangThucHien;
  currentTitle: string = 'Đang thực hiện'

  constructor(
    private suaChuaService: SuaChuaService,
    private toastrService: ToastrService
  ) { 
    this.trangThaiSuaChua = TrangThaiSuaChua;
  }

  onListChanged(event: number) {
    const ref = ["Đang thực hiện", "Chuẩn bị bàn giao", "Hoàn thành", "Tất cả"];
    this.componentDisplayed = event;
    this.currentTitle = ref[event];

  }

  ngOnInit() {
    this.subscriptions.suachuas = this.suaChuaService.getSuaChuasCurrent().subscribe(
      snapshots => {
        this.suachuas = <SuaChua[]>snapshots;
        // console.log('data: ', this.suachuas);
      }, (error: Error) => this.toastrService.error(`Không thể truy vấn dữ liệu. ${error.message}`, 'Opps!')
    )
  }

  ngOnDestroy() {
    this.subscriptions.suachuas.unsubscribe();
  } 

}