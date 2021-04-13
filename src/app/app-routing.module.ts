import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TraywindowComponent } from './traywindow/traywindow.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: "traywindow",
    pathMatch: "full"
  },
  {
    path: "main",
    component: MainComponent
  },
  {
    path: "traywindow",
    component: TraywindowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
