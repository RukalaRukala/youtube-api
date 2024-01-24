import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Path } from './api.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private searchUrl = `https://www.googleapis.com/youtube/v3/search?${environment.apiKey}`;

  private videosUrl = `https://www.googleapis.com/youtube/v3/videos?${environment.apiKey}`;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const searchParams = request.params
      .append('type', 'video')
      .append('part', 'snippet')
      .append('maxResults', '100');
    const videoParams = request.params.append('part', 'snippet,statistics');

    const cloned = request.clone({
      url: request.url === Path.SEARCH ? this.searchUrl : this.videosUrl,
      params: request.url === Path.SEARCH ? searchParams : videoParams,
    });

    return next.handle(cloned);
  }
}
