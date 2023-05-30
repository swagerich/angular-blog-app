import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { PublicationsPageComponent } from './pages/admin/publications/publications-page/publications-page.component';
import { CategoriesPageComponent } from './pages/admin/categories/categories-page/categories-page.component';
import { CommentsPageComponent } from './pages/admin/comments/comments-page/comments-page.component';
import { AdminLayoutPageComponent } from './pages/admin/admin-layout-page/admin-layout-page.component';
import { MaterialModule } from '../material/material.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { WelcomePageComponent } from './pages/admin/welcome-page/welcome-page.component';
import { AddPostPageComponent } from './pages/admin/publications/add-post-page/add-post-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCategoryPageComponent } from './pages/admin/categories/add-category-page/add-category-page.component';
import { UpdateCategoryPageComponent } from './pages/admin/categories/update-category-page/update-category-page.component';
import { UpdatePublicationPageComponent } from './pages/admin/publications/update-publication-page/update-publication-page.component';
import { ViewDetailsCategoryPageComponent } from './pages/admin/categories/view-details-category-page/view-details-category-page.component';
import { UserLayoutPageComponent } from './pages/users/user-layout-page/user-layout-page.component';
import { LoadPublicationPageComponent } from './pages/public/load-publication-page/load-publication-page.component';
import { SideBarUserComponent } from './pages/users/side-bar-user/side-bar-user.component';
import { SideBarPublicComponent } from './pages/public/side-bar-public/side-bar-public.component';
import { PublicLayoutPageComponent } from './pages/public/public-layout-page/public-layout-page.component';
import { CardComponent } from './components/card/card.component';
import { PublicationDetailsPageComponent } from './pages/public/publication-details-page/publication-details-page.component';
import { CommentsComponent } from './components/comments/comments.component';
import { PublicationDetailsComponent } from './components/publication-details/publication-details.component';
import { AddCommentPublication } from './pages/users/add-comment-publication/add-comment-publication.component';
import { WelcomePageUserComponent } from './pages/users/welcome-page-user/welcome-page-user.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileUserPageComponent } from './pages/users/profile-user-page/profile-user-page.component';
import { ProfileAdminPageComponent } from './pages/admin/profile-admin-page/profile-admin-page.component';
import { LoadPublicationUserPageComponent } from './pages/users/load-publication-user-page/load-publication-user-page.component';

@NgModule({
  declarations: [
    PublicationsPageComponent,
    CategoriesPageComponent,
    CommentsPageComponent,
    AdminLayoutPageComponent,
    SideBarComponent,
    WelcomePageComponent,
    AddPostPageComponent,
    AddCategoryPageComponent,
    UpdateCategoryPageComponent,
    UpdatePublicationPageComponent,
    ViewDetailsCategoryPageComponent,
    UserLayoutPageComponent,
    LoadPublicationPageComponent,
    SideBarUserComponent,
    SideBarPublicComponent,
    PublicLayoutPageComponent,
    CardComponent,
    PublicationDetailsPageComponent,
    CommentsComponent,
    PublicationDetailsComponent,
    AddCommentPublication,
    WelcomePageUserComponent,
    HomeComponent,
    ProfileUserPageComponent,
    ProfileAdminPageComponent,
    LoadPublicationUserPageComponent,

  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class BlogModule { }
