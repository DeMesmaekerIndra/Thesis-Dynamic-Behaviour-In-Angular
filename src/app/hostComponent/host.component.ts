import { AfterViewInit, Compiler, Component, Inject, Injector, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
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
        // Load the HTML template
        const template =
            '<ng-container *ngIf="extensionData$ | async as data">' +
            '<div>HTML template retrieved from an external source: Database, static file being hosted...</div>' +
            '<p>This is a binding with data retrieved from the third party {{data.helloMessage}}</p>' +
            '</ng-container>';

        // Create references to module & component
        const componentRef = Component({ template })(class { public extensionData$: Observable<object>; });
        const moduleRef = NgModule({ declarations: [componentRef], imports: [CommonModule] })(class { });

        // Build and compile the module and componentent into factories
        this.compiler.compileModuleAndAllComponentsAsync(moduleRef).then((compiledModule => {
            const module = compiledModule.ngModuleFactory.create(this.injector);
            const componentFactory = compiledModule.componentFactories[0];
            const component = componentFactory.create(this.injector, [], null, module);

            component.instance.extensionData$ = this.dataFetcher.getDataFromExternalApiWebhook('https://www.externalPart.com/getData');
            this.container.insert(component.hostView);
        }));

    }

}
