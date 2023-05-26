import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:() => import("./blog/blog.module").then(m  => m.BlogModule),
  },
  {
    path:'auth',
    loadChildren:() => import("./blog/auth/auth.module").then(m  => m.AuthModule),
  },
  {
    path:'**',
    redirectTo:'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
