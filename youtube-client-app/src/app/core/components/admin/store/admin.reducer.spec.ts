import { IItemModel } from '../../../../you-tube/item/item.model';
import { customItemsReducer, ICustomItemState } from './admin.reducer';
import { addItemSuccess, deleteCard } from './admin.actions';

describe('Custom Items Reducer', () => {
  let initialState: ICustomItemState;
  let itemToAdd: IItemModel;

  beforeEach(() => {
    initialState = { customItems: [] };
    itemToAdd = {
      id: 'testId',
      itemName: 'test',
      imageURL: 'test',
      custom: false,
      date: new Date(),
      favorite: false,
      description: 'test',
      actions: {} as unknown,
    } as IItemModel;
  });

  it('should add an item successfully', () => {
    const action = addItemSuccess({ payload: itemToAdd });

    const newState = customItemsReducer(initialState, action);

    expect(newState.customItems).toHaveLength(1);
    expect(newState.customItems[0]).toEqual(itemToAdd);
  });

  it('should delete a card', () => {
    const initialStateWithItems: ICustomItemState = {
      customItems: [itemToAdd],
    };
    const itemsAfterDelete: IItemModel[] = [itemToAdd, { ...itemToAdd }];

    const action = deleteCard({ payload: itemsAfterDelete });

    const newState = customItemsReducer(initialStateWithItems, action);

    expect(newState.customItems).toEqual(itemsAfterDelete);
  });
});
