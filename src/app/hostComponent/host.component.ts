import { AfterViewInit, Component, Injector, NgModuleFactoryLoader, OnInit, SystemJsNgModuleLoader, ViewChild, ViewContainerRef } from '@angular/core';
import { ExternalComponent } from '../ExternalModules/externalComponent.component';

@Component({
    templateUrl: './host.component.html',
    providers: [
        {
            provide: NgModuleFactoryLoader,
            useClass: SystemJsNgModuleLoader
        }
    ]
})
export class HostComponent implements AfterViewInit {
    title = 'TestDynamicImport';
    @ViewChild('dynamiccomponent', { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(private injector: Injector, private loader: NgModuleFactoryLoader) {
        console.log('hi');
    }

    ngAfterViewInit(): void {
        // Loads the file
        this.loader.load('src/app/ExternalModules/external.module#ExternalModule')
            // Builds and returns a mdoule factoru
            .then((moduleFactory) => {
                // Create an instance of the module and pass the injector to enable dependency injection.
                const module = moduleFactory.create(this.injector);

                // Retrieve a reference to the factory resolver for all components declared on that module
                const r = module.componentFactoryResolver;

                // Create a component factory for a specific Component
                const cmpFactory = r.resolveComponentFactory(ExternalComponent);

                // Create an instance of the component and attach it to the view.
                this.container.createComponent(cmpFactory);
            });
    }
}
