import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DummyComponentComponent } from './dummy-component.component';
import { DummyRoutingModule } from './dummy-routing.module';


@NgModule({
  declarations: [DummyComponentComponent],
  imports: [
    CommonModule,
    DummyRoutingModule
  ]
})
export class DummyModule { }
