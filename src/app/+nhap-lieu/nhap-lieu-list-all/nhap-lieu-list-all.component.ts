import { Component, OnInit, OnDestroy } from '@angular/core';
import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { SuaChua, TrangThaiSuaChua } from '../../core/shared/sua-chua.model';
import { dateTimeDisplayFormat } from '../../core/shared/date-time-format.model';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'toastr-ng2';
import { NavbarSearchService } from '../../core/shared/navbar-search.service';

@Component({
  selector: 'sk-nhap-lieu-list-all',
  templateUrl: './nhap-lieu-list-all.component.html',
  styleUrls: ['./nhap-lieu-list-all.component.scss']
})
export class NhapLieuListAllComponent implements OnInit {

  suachuasCurrentSub: Subscription;
  suachuasDoneSub: Subscription;
  navbarSearchStringSub: Subscription;

  suachuasCurrent: SuaChua[] = [];
  suachuasDone: SuaChua[] = [];
  trangThaiSuaChua: any;
  dateTimeDisplayFormat: string;

  navbarSearchString: string = '';

  constructor(
    private suaChuaService: SuaChuaService,
    private toastrService: ToastrService,
    private navbarSearchService: NavbarSearchService
  ) {
    this.trangThaiSuaChua = TrangThaiSuaChua;
    this.dateTimeDisplayFormat = dateTimeDisplayFormat;
  }

  ngOnInit() {
    this.suachuasCurrentSub = this.suaChuaService.getSuaChuasCurrent().subscribe(
      snapshots => {
        this.suachuasCurrent = <SuaChua[]>snapshots;
      }, (error: Error) => this.toastrService.error(`Không thể truy vấn dữ liệu. ${error.message}`, 'Opps!')
    )
    this.suachuasDoneSub = this.suaChuaService.getSuaChuaDoneToday().subscribe(
      snapshots => {
        this.suachuasDone = <SuaChua[]>snapshots;
      }, (error: Error) => this.toastrService.error(`Không thể truy vấn dữ liệu. ${error.message}`, 'Opps!')
    )
    this.navbarSearchService.setSearchMode('ma_thiet_bi');
    this.navbarSearchStringSub = this.navbarSearchService.searchString$
      .debounceTime(500)
      .subscribe((key: string) => {
        this.navbarSearchString = key;
      });
  }

  ngOnDestroy() {
    this.navbarSearchService.setSearchMode('');
    
    if (this.suachuasCurrentSub)
      this.suachuasDoneSub.unsubscribe();
    if (this.suachuasDoneSub)
      this.suachuasDoneSub.unsubscribe();
    if (this.navbarSearchStringSub)
      this.navbarSearchStringSub.unsubscribe();
  }


}
