import { AfterViewInit, Compiler, Component, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { ExternalComponent } from '../ExternalModules/externalComponent.component';

@Component({
    templateUrl: './host.component.html'
})
export class HostComponent implements AfterViewInit {
    // HTML element dat als parent van de dynamische component zal dienen
    @ViewChild('dynamiccomponent', { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(private injector: Injector, private compiler: Compiler) { }

    ngAfterViewInit(): void {
        // Inladen van het module bestand
        import('../ExternalModules/external.module')
            // Terugkrijgen van een referentie naar de module klasse
            .then(moduleClassRef =>
                // Het compileren van de module klasse naar zijn factory
                this.compiler.compileModuleAndAllComponentsAsync(moduleClassRef.ExternalModule).then((compiledModule => {
                    // Module instantie maken met factory, dependency Injector meegeven
                    const module = compiledModule.ngModuleFactory.create(this.injector);

                    // Resolver gebruiken om een component factory te vinden op basis van type
                    const componentFactory = module.componentFactoryResolver.resolveComponentFactory(ExternalComponent);

                    // Instantie van component maken en vasthangen aan parent element
                    this.container.createComponent(componentFactory);
                })));
    }
}
