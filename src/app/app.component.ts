import { Component } from '@angular/core';
import { AppRoutingModule, routableComponents } from './app-routing.module';

@Component({
  selector: 'sk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
}
