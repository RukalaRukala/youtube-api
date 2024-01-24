import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './favorite.component';
import { YouTubeModule } from '../you-tube/you-tube.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FavoriteComponent],
  imports: [CommonModule, YouTubeModule, SharedModule],
})
export class FavoriteModule {}
