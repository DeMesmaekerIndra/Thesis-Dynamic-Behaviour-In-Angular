import { AfterViewInit, Compiler, Component, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { ExternalComponent } from '../ExternalModules/externalComponent.component';

@Component({
    templateUrl: './host.component.html'
})
export class HostComponent implements AfterViewInit {
    title = 'TestDynamicImport';
    @ViewChild('dynamiccomponent', { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(private injector: Injector, private compiler: Compiler) {
        console.log('hi');
    }

    ngAfterViewInit(): void {
        // Loads the file
        import('../ExternalModules/external.module')
            // Builds and returns a mdoule factoru
            .then(moduleClassRef =>
                this.compiler.compileModuleAndAllComponentsAsync(moduleClassRef.ExternalModule).then((compiledModule => {
                    const module = compiledModule.ngModuleFactory.create(this.injector);
                    const componentFactory = compiledModule.componentFactories[0];
                    const component = componentFactory.create(this.injector, [], null, module);

                    this.container.insert(component.hostView);
                })));

    }

}
