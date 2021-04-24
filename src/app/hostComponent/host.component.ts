import { AfterViewInit, Compiler, Component, Injector, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { ExternalDataFetcherService } from '../services/external-data-fetcher.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    templateUrl: './host.component.html'
})
export class HostComponent implements AfterViewInit {
    title = 'TestDynamicImport';
    @ViewChild('dynamiccomponent', { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(private injector: Injector, private dataFetcher: ExternalDataFetcherService, private compiler: Compiler) { }

    ngAfterViewInit(): void {
        // inladen van een component template
        const template =
            '<ng-container *ngIf="extensionData$ | async as data">' +
            '<div>HTML template retrieved from an external source: Database, static file being hosted...</div>' +
            '<p>This is a binding with data retrieved from the third party: "{{data.helloMessage}}"</p>' +
            '</ng-container>';

        // Opbouwen van component & module, opslagen van referenties
        const componentRef = Component({ template })(class { public extensionData$: Observable<object>; });
        const moduleRef = NgModule({ declarations: [componentRef], imports: [CommonModule] })(class { });

        // Exact zoals vorige keren het bouwen van de factories, instantiëren en tonen
        this.compiler.compileModuleAndAllComponentsAsync(moduleRef).then((compiledModule => {
            const module = compiledModule.ngModuleFactory.create(this.injector);
            const componentFactory = module.componentFactoryResolver.resolveComponentFactory(componentRef);
            const component = this.container.createComponent(componentFactory);

            component.instance.extensionData$ = this.dataFetcher.getDataFromExternalSource('https://www.externalPart.com/getData');
        }));
    }
}
