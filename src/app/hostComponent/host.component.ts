import { AfterViewInit, Component, Injector, NgModuleFactoryLoader, SystemJsNgModuleLoader, ViewChild, ViewContainerRef } from '@angular/core';
import { ExternalComponent } from '../ExternalModules/externalComponent.component';

@Component({
    templateUrl: './host.component.html'
})
export class HostComponent implements AfterViewInit {
    // HTML element die als root van de component zal dienen
    @ViewChild('dynamiccomponent', { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(private injector: Injector, private loader: SystemJsNgModuleLoader) { }

    ngAfterViewInit(): void {
        // Inladen van het bestand
        this.loader.load('src/app/ExternalModules/external.module#ExternalModule')
            // Terugkrijgen van een gecompileerde module factory
            .then((moduleFactory) => {
                // Instantie van module aanmaken, injectory meegeven om depenency injection toe te laten.
                const module = moduleFactory.create(this.injector);

                // Referentie naar de 'resolver' ophalen die component factories kan vinden
                const r = module.componentFactoryResolver;

                // Resolver gebruiken om een component factory te vinden in de gecompileerde module
                const cmpFactory = r.resolveComponentFactory(ExternalComponent);

                // Instantie van component maken een vasthangen aan een parent element.
                this.container.createComponent(cmpFactory);
            });
    }
}
