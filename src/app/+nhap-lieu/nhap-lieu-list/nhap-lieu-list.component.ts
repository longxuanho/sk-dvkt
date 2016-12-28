import { Component, OnInit, OnDestroy } from '@angular/core';
import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { SuaChua } from '../../core/shared/sua-chua.model';
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
  display: any;
  componentDisplayed: number = Display.DangThucHien;
  currentTitle: string = 'Đang thực hiện'
  currentComponentText: string = 'Hoàn thành';

  constructor(
    private suaChuaService: SuaChuaService,
    private toastrService: ToastrService
  ) { 
    this.display = Display;
  }

  onComponentDisplayedChange() {
    this.componentDisplayed++;
    if (this.componentDisplayed > Display.HoanThanh)
      this.componentDisplayed = Display.All;

    let refTitle = ['Tất cả', 'Đang thực hiện', 'Hoàn Thành'];
    this.currentTitle = refTitle[this.componentDisplayed];

    let refText = ['Đang thực hiện', 'Hoàn Thành', 'Tất cả'];
    this.currentComponentText = refText[this.componentDisplayed];

    
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

enum Display {
  All = 0,
  DangThucHien = 1,
  HoanThanh = 2
}