import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
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
    ],
    providers: [{ provide: SystemJsNgModuleLoader }]
})
export class HostModule { }
