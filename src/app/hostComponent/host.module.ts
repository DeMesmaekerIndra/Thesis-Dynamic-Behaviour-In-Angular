import { Compiler, CompilerFactory, COMPILER_OPTIONS, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostComponent } from './host.component';
import { HostRoutingModule } from './host-routing.module';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

export function createCompiler(fn: CompilerFactory): Compiler {
    return fn.createCompiler();
}

@NgModule({
    entryComponents: [
        HostComponent
    ],
    imports: [
        CommonModule,
        HostRoutingModule
    ]
})
export class HostModule { }
