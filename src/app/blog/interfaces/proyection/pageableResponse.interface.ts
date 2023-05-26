import { PublicationDto } from './publicationDto.interface';

export interface PageableResponse {
  publications: PublicationDto[];
  pages: Page;
}
export interface Page {
  totalPublications:number;
  totalPages: number;
  pageNumber: number;
}
