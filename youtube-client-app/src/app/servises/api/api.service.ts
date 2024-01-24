import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import {
  IItem,
  IItemId,
  ISearchResponse,
} from '../../core/components/header/search/search-response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Path } from './api.model';
import { IItemModel } from '../../you-tube/item/item.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  temp: IItemModel[] = [];

  lastQuery = '';

  constructor(private http: HttpClient) {}

  search(searchQuery = '') {
    if (!searchQuery) {
      return of([]);
    }
    if (this.lastQuery === searchQuery) {
      return of(this.temp);
    }
    this.lastQuery = searchQuery;
    const params = new HttpParams().set('q', searchQuery);
    return this.http.get<ISearchResponse>(Path.SEARCH, { params: params }).pipe(
      map(({ items }) => items.map(item => (item.id as IItemId).videoId)),
      switchMap(ids => this.getVideosResponse(ids)),
      tap(data => (this.temp = data))
    );
  }

  getById(id: string): Observable<IItemModel> {
    return this.getVideosResponse([id]).pipe(map(res => res[0]));
  }

  getVideosResponse(idList: string[]) {
    return this.http
      .get<ISearchResponse>(Path.VIDEOS, {
        params: new HttpParams().set('id', idList.join(',')),
      })
      .pipe(map(response => this.mapResponse(response.items)));
  }

  mapResponse(value: IItem[]): IItemModel[] {
    return value.map(elem => {
      return {
        id: elem.id as string,
        imageURL: elem.snippet.thumbnails.high.url,
        actions: elem.statistics,
        itemName: elem.snippet.localized.title,
        date: new Date(elem.snippet.publishedAt),
        description: elem.snippet.localized.description,
        favorite: false,
      };
    });
  }
}
