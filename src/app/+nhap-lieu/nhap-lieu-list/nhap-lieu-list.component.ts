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

  constructor(
    private suaChuaService: SuaChuaService,
    private toastrService: ToastrService
  ) { }

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
