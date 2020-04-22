import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';
import { PaymentsComponent } from './payments/payments.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path:"", component: AppComponent},
  {path:"generator", component: GeneratorComponent},
  {path:"payments", component:PaymentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
