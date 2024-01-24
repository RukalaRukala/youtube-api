import { IncludesPhrasePipe } from './includes-phrase.pipe';
import { IItemModel } from '../../you-tube/item/item.model';

describe('IncludesPhrasePipe', () => {
  let pipe: IncludesPhrasePipe;
  const item = {
    id: 'test',
    itemName: 'test',
    imageURL: 'test',
    custom: false,
    date: new Date(),
    favorite: false,
    description: 'test',
    actions: {} as unknown,
  } as IItemModel;
  const mockItems: IItemModel[] = [item];

  beforeEach(() => {
    pipe = new IncludesPhrasePipe();
  });

  it('should return items matching the phrase in itemName or description', () => {
    const filteredItems = pipe.transform(mockItems, 'test');
    expect(filteredItems).toEqual([item]);
  });
});
