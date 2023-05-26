import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesPageComponent } from './pages/admin/categories/categories-page/categories-page.component';
import { CommentsPageComponent } from './pages/admin/comments/comments-page/comments-page.component';
import { PublicationsPageComponent } from './pages/admin/publications/publications-page/publications-page.component';
import { AdminLayoutPageComponent } from './pages/admin/admin-layout-page/admin-layout-page.component';
import { WelcomePageComponent } from './pages/admin/welcome-page/welcome-page.component';
import { AddPostPageComponent } from './pages/admin/publications/add-post-page/add-post-page.component';
import { AdminGuard } from './auth/guards/admin.guard';
import { NotFound404Component } from '../shared/pages/not-found404/not-found404.component';
import { AddCategoryPageComponent } from './pages/admin/categories/add-category-page/add-category-page.component';
import { UpdateCategoryPageComponent } from './pages/admin/categories/update-category-page/update-category-page.component';
import { UpdatePublicationPageComponent } from './pages/admin/publications/update-publication-page/update-publication-page.component';
import { ViewDetailsCategoryPageComponent } from './pages/admin/categories/view-details-category-page/view-details-category-page.component';
import { UserLayoutPageComponent } from './pages/users/user-layout-page/user-layout-page.component';
import { UserGuard } from './auth/guards/user.guard';
import { LoadPublicationPageComponent } from './pages/public/load-publication-page/load-publication-page.component';
import { SignupPageComponent } from './auth/pages/signup-page/signup-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { PublicLayoutPageComponent } from './pages/public/public-layout-page/public-layout-page.component';
import { PublicationDetailsPageComponent } from './pages/public/publication-details-page/publication-details-page.component';
import { AddCommentPublication } from './pages/users/add-comment-publication/add-comment-publication.component';
import { WelcomePageUserComponent } from './pages/users/welcome-page-user/welcome-page-user.component';

const routes: Routes = [


  {
    path: 'signup',
    component: SignupPageComponent,
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    pathMatch:'full'
  },

  {
    path: '',
    component: PublicLayoutPageComponent,
    children:[
      {
        path:'load',
        component:LoadPublicationPageComponent,
  
      },
      {
        path:'publication-details/:id',
        component:PublicationDetailsPageComponent,
 
      },
      /* por ahora lo probare el user aqui */
      {
        path:'comment-publication/:id',
        component:AddCommentPublication
      },
      
    ]
  },


  // USER
  {
    path: 'user',
    component: UserLayoutPageComponent,
    canActivate: [UserGuard],
    children:[
      {
        path:'welcome',
        component:WelcomePageUserComponent
      },
      
    ]
  },

 // ADMIN
  {
    path: 'admin',
    component: AdminLayoutPageComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'categories',
        component: CategoriesPageComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryPageComponent,
      },
      {
        path: 'update-category/:id',
        component: UpdateCategoryPageComponent,
      },
      {
        path: 'view-details/:id',
        component: ViewDetailsCategoryPageComponent,
      },
      {
        path: 'comments',
        component: CommentsPageComponent,
      },
      {
        path: 'publications',
        component: PublicationsPageComponent,
      },
      {
        path: 'add-publication',
        component: AddPostPageComponent,
      },
      {
        path: 'update-publication/:id',
        component: UpdatePublicationPageComponent,
      },
      {
        path: 'welcome',
        component: WelcomePageComponent,
      },
      {
        path: '404',
        component: NotFound404Component,
      },
      {
        path: '**',
        redirectTo: '404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
