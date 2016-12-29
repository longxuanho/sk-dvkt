import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentPipe } from './moment.pipe';
import { DurationPipe } from './duration.pipe';

@NgModule({
  imports: [],
  declarations: [
    MomentPipe,
    DurationPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MomentPipe,
    DurationPipe
  ]
})
export class SharedModule { }