import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IItemModel } from '../../you-tube/item/item.model';
import {
  IItem,
  IStatistics,
  IThumbnails,
  ITitle,
} from '../../core/components/header/search/search-response.model';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let mockHttp: HttpTestingController;
  let expectedOutput: IItemModel[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    mockHttp = TestBed.inject(HttpTestingController);
    expectedOutput = [
      {
        id: 'video1',
        imageURL: 'https://example.com/image1.jpg',
        actions: {} as IStatistics,
        itemName: 'Video Title 1',
        date: new Date('2023-01-01T12:00:00Z'),
        description: 'Description of Video 1',
        favorite: false,
      },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch videos based on ID list', () => {
    const idList = ['video1', 'video2', 'video3'];

    service.mapResponse = jest
      .fn()
      .mockReturnValue(() => [{ id: 'video1' } as IItemModel]);

    service.getVideosResponse(idList).subscribe(result => {
      expect(result).toBeTruthy();
      expect(result).toEqual([{ id: 'video1' } as IItemModel]);
    });
  });

  it('should map IItem to IItemModel correctly', () => {
    const inputItems: IItem[] = [
      {
        id: 'video1',
        snippet: {
          thumbnails: {
            high: {
              url: 'https://example.com/image1.jpg',
            },
          } as IThumbnails,
          localized: {
            title: 'Video Title 1',
            description: 'Description of Video 1',
          } as ITitle,
          publishedAt: '2023-01-01T12:00:00Z',
        },
        statistics: {} as IStatistics,
      } as IItem,
    ];

    const result = service.mapResponse(inputItems);

    expect(result).toEqual(expectedOutput);
  });

  it('should get video by id', () => {
    service.getById('video1').subscribe(() => expectedOutput[0]);
  });

  it('should return empty array when searchQuery is empty', () => {
    service.search('').subscribe(result => {
      expect(result).toEqual([]);
    });
  });

  it('should return IItemModel object', () => {
    const responseMock = { id: 'video1' } as IItemModel;
    jest
      .spyOn(service, 'getVideosResponse')
      .mockReturnValue(of([responseMock]));
    service.getById('video1').subscribe(result => {
      expect(result).toEqual(responseMock);
    });
  });

  it('should return IItemModel[] object', () => {
    const responseMock = [{ id: 'video1' } as IItemModel];

    service.getVideosResponse(['video1']).subscribe(result => {
      expect(result).toEqual(responseMock);
    });

    const req = mockHttp.expectOne(`videos?id=video1`);
    expect(req.request.method).toBe('GET');
    req.flush(responseMock);
  });

  it('should return cached data when same searchQuery is used', () => {
    service.lastQuery = 'example';
    service.temp = [
      { id: 'video1' } as IItemModel,
      { id: 'video2' } as IItemModel,
    ];

    service.search('example').subscribe(result => {
      expect(result).toEqual([{ id: 'video1' }, { id: 'video2' }]);
    });

    mockHttp.expectNone('');
  });

  it('should fetch new data when different searchQuery is used', () => {
    const mockResponse = [
      { id: { videoId: 'video3' } } as IItem,
      { id: { videoId: 'video4' } } as IItem,
    ];

    service.search('js').subscribe(result => {
      expect(result).toEqual(mockResponse);
    });

    const req = mockHttp.expectOne(`search?q=js`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    // expect(httpMock.get).toHaveBeenCalledWith('Path.SEARCH', {
    //   params: { q: 'differentQuery' },
    // });
  });
});
