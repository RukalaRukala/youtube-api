import { IStatistics } from '../../core/components/header/search/search-response.model';

export interface IItemModel {
  id: string;
  imageURL: string;
  actions: IStatistics;
  itemName: string;
  date: Date;
  description: string;
  custom?: boolean;
  favorite?: boolean;
}
