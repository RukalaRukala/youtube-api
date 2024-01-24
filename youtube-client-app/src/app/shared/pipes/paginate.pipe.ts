import { Pipe, PipeTransform } from '@angular/core';
import { IItemModel } from '../../you-tube/item/item.model';

@Pipe({
  name: 'paginate',
})
export class PaginatePipe implements PipeTransform {
  transform(
    items: IItemModel[] | null,
    [start, end]: number[]
  ): IItemModel[] | null {
    return items ? items.slice(start, end) : null;
  }
}
