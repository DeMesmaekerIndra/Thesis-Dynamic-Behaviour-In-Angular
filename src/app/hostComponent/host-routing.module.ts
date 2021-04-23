import { Routes, RouterModule } from '@angular/router';
import { HostComponent } from './host.component';

const routes: Routes = [
    {
        path: '',
        component: HostComponent
    }
];

export const HostRoutingModule = RouterModule.forChild(routes);
