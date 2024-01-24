interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface IImage {
  url: string;
  width: number;
  height: number;
}

export interface IThumbnails {
  default: IImage;
  medium: IImage;
  high: IImage;
  standard: IImage;
  maxres: IImage;
}

export interface ITitle {
  title: string;
  description: string;
}

interface ISnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IThumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: ITitle;
  defaultAudioLanguage: string;
}

export interface IStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface IItemId {
  kind: string;
  videoId: string;
}

export interface IItem {
  kind: string;
  etag: string;
  id: IItemId | string;
  snippet: ISnippet;
  statistics: IStatistics;
}

export interface ISearchResponse {
  TODO: string;
  kind: string;
  etag: string;
  pageInfo: IPageInfo;
  items: IItem[];
}
