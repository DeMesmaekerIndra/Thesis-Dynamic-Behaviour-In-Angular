import { AfterViewInit, Compiler, Component, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { ExternalComponent } from '../ExternalModules/externalComponent.component';

@Component({
    templateUrl: './host.component.html'
})
export class HostComponent implements AfterViewInit {
    // HTML element dat als root van de component zal dienen
    @ViewChild('dynamiccomponent', { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(private injector: Injector, private compiler: Compiler) { }

    ngAfterViewInit(): void {
        // Inladen van het module bestand
        import('../ExternalModules/external.module')
            // Terugkrijgen van een referentie naar de module klasse
            .then(moduleClassRef =>
                // Het compileren van de module klasse naar zijn factories
                this.compiler.compileModuleAndAllComponentsAsync(moduleClassRef.ExternalModule).then((compiledModule => {
                    // Module instantie maken met factory, injector meegeven om dependency injection toe te laten
                    const module = compiledModule.ngModuleFactory.create(this.injector);

                    // Zoeken naar gewenste component factory met de componentFactoryResolver
                    const componentFactory = module.componentFactoryResolver.resolveComponentFactory(ExternalComponent);

                    // Instantie van component maken en vasthangen aan parent element
                    this.container.createComponent(componentFactory);
                })));
    }
}
