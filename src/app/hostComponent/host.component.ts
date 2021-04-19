import { AfterViewInit, Compiler, Component, Injector, NgModuleFactoryLoader } from '@angular/core';

@Component({
    templateUrl: './host.component.html',
})
export class HostComponent implements AfterViewInit {
    title = 'TestDynamicImport';

    constructor(private injector: Injector, private loader: NgModuleFactoryLoader) {  }
    ngAfterViewInit(): void {
        this.loader.load('app/t.module#TModule').then((factory) => {
            const module = factory.create(this.injector);
            const r = module.componentFactoryResolver;
            const cmpFactory = r.resolveComponentFactory(AComponent);

            // create a component and attach it to the view
            const componentRef = cmpFactory.create(this.injector);
            this.container.insert(componentRef.hostView);
        });
    }
}
