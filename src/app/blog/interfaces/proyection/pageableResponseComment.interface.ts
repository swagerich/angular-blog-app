import { ComentarioDTo } from './comentarioDto.interface';

export interface PageableResponseComment {
  comments: ComentarioDTo[];
  pages: Page;
}
export interface Page {
  totalComments: number;
  totalPages: number;
  pageNumber: number;
}
