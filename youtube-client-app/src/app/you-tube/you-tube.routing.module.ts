import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YouTubeComponent } from './you-tube.component';

const routes: Routes = [{ path: '', component: YouTubeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YouTubeRoutingModule {}
