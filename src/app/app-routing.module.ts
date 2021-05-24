import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/hostComponent/host.module').then(m => m.HostModule)
  },
  {
    path: 'testIfDestroyed',
    loadChildren: () => import('../app/dummy-component/dummy.module').then(m => m.DummyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
