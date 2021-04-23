
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalComponent } from './externalComponent.component';

@NgModule({
    imports: [
        CommonModule
    ],
    entryComponents: [ExternalComponent]
})
export class ExternalModule { }
