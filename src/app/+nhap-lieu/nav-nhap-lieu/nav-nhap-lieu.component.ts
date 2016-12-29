import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrangThaiSuaChua } from '../../core/shared/sua-chua.model';

@Component({
  selector: 'sk-nav-nhap-lieu',
  templateUrl: './nav-nhap-lieu.component.html',
  styleUrls: ['./nav-nhap-lieu.component.scss']
})
export class NavNhapLieuComponent implements OnInit {

  @Output() listChanged = new EventEmitter<number>();
  trangThaiSuaChua: any;
  listNameCurrent: number;

  constructor( ) {
    this.trangThaiSuaChua = TrangThaiSuaChua;
    this.listNameCurrent = 0;
  }

  onListChanged(event: Event, listName: number) {
    event.preventDefault();
    this.listNameCurrent = listName;
    this.listChanged.emit(listName);
  }

  ngOnInit() {
  }
}


// export class NavNhapLieuComponent implements OnInit {

//   subscriptions: { routeEvent?: Subscription } = {};
//   currentUrl: string;
//   currentUrlText: string;
//   textRefs = {
//     '/nhap-lieu': 'Danh sách',
//     '/nhap-lieu/tao-moi': 'Tạo mới'
//   }

//   constructor(
//     private router: Router
//   ) { }

//   ngOnInit() {
//     this.subscriptions.routeEvent = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
//       this.currentUrl = event.urlAfterRedirects;
//       this.currentUrlText = this.textRefs[this.currentUrl]? this.textRefs[this.currentUrl]: 'Cập nhật';
//     });
//   }

//   ngOnDestroy() {
//     this.subscriptions.routeEvent.unsubscribe();
//   }

   

// }
