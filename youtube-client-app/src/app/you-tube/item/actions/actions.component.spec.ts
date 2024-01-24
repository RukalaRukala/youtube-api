import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsComponent } from './actions.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IStatistics } from '../../../core/components/header/search/search-response.model';

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    component.actions = {
      viewCount: 'Test View',
      likeCount: 'Test Like',
      dislikeCount: 'Test Dislike',
      favoriteCount: 'Test Favorite',
      commentCount: 'Test Comment',
    } as IStatistics;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
