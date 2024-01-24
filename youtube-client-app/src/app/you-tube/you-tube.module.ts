import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { YouTubeComponent } from './you-tube.component';
import { ItemComponent } from './item/item.component';
import { ActionsComponent } from './item/actions/actions.component';
import { DetailsComponent } from './details/details.component';
import { ColorBorderDirective } from '../shared/directives/color-border.directive';
import { IncludesPhrasePipe } from '../shared/pipes/includes-phrase.pipe';
import { CommonButtonComponent } from '../shared/components/common-button/common-button.component';
import { YouTubeRoutingModule } from './you-tube.routing.module';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginatePipe } from '../shared/pipes/paginate.pipe';

@NgModule({
  declarations: [
    YouTubeComponent,
    ItemComponent,
    ActionsComponent,
    ColorBorderDirective,
    DetailsComponent,
    IncludesPhrasePipe,
    PaginationComponent,
    PaginatePipe,
  ],
  imports: [
    CommonModule,
    CommonButtonComponent,
    YouTubeRoutingModule,
    NgOptimizedImage,
  ],
  exports: [
    YouTubeComponent,
    DetailsComponent,
    ItemComponent,
    IncludesPhrasePipe,
    PaginatePipe,
    PaginationComponent,
  ],
})
export class YouTubeModule {}
