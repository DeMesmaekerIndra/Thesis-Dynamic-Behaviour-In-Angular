import { RouterModule, Routes } from '@angular/router';
import { DummyComponentComponent } from './dummy-component.component';

const routes: Routes = [
  {
    path: '',
    component: DummyComponentComponent
  }
];

export const DummyRoutingModule = RouterModule.forChild(routes);
