import { isDevMode, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouTubeModule } from '../you-tube/you-tube.module';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/header/search/search.component';
import { FilterComponent } from './components/header/filter/filter.component';
import { ProfileComponent } from './components/header/profile/profile.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { CoreLayoutComponent } from './core-layout.component';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { CommonButtonComponent } from '../shared/components/common-button/common-button.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from '../servises/api/api.interceptor';
import { AdminModule } from './components/admin/admin.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { YouTubeEffects } from '../you-tube/store/you-tube.effects';
import { reducers } from './core.reducers';
import { FilterEffects } from './store/filter/filter.effects';
import { AdminEffects } from './components/admin/store/admin.effects';
import { FavoriteModule } from '../favorite/favorite.module';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiInterceptor,
  multi: true,
};

@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent,
    FilterComponent,
    CoreLayoutComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ProfileComponent,
    CommonButtonComponent,
    YouTubeModule,
    RouterModule,
    AuthModule,
    SharedModule,
    AdminModule,
    FormsModule,
    FavoriteModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([YouTubeEffects, FilterEffects, AdminEffects]),
  ],
  providers: [INTERCEPTOR_PROVIDER],
  exports: [CoreLayoutComponent],
})
export class CoreModule {}
