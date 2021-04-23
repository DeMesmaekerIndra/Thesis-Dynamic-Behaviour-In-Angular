import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostComponent } from './host.component';
import { HostRoutingModule } from './host-routing.module';

@NgModule({
    declarations: [
        HostComponent
    ],
    imports: [
        CommonModule,
        HostRoutingModule
    ]
})
export class HostModule { }
