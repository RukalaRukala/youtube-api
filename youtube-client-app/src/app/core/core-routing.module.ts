import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from '../you-tube/details/details.component';
import { authGuard } from '../auth/guards/auth/auth.guard';
import { LoginPageComponent } from '../auth/pages/login-page/login-page.component';
import { AdminComponent } from './components/admin/admin.component';
import { FavoriteComponent } from '../favorite/favorite.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'login',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
  },
  { path: 'admin', component: AdminComponent },
  { path: 'favorite', component: FavoriteComponent },
  {
    path: 'search',
    loadChildren: () =>
      import('../you-tube/you-tube.module').then(m => m.YouTubeModule),
    canActivate: [authGuard],
  },
  { path: 'search/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
