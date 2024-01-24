import { Pipe, PipeTransform } from '@angular/core';
import { IItemModel } from '../../you-tube/item/item.model';

@Pipe({
  name: 'includesPhrase',
})
export class IncludesPhrasePipe implements PipeTransform {
  transform(items: IItemModel[] | null, word: string | null) {
    if (!word) {
      return items;
    }
    if (items) {
      return items.filter(
        item =>
          item.itemName.toLowerCase().includes(word.toLowerCase()) ||
          item.description.toLowerCase().includes(word.toLowerCase())
      );
    }
    return null;
  }
}
