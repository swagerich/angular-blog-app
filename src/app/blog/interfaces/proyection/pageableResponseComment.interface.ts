import { ComentariDTo } from './comentarioDto.interface';

export interface PageableResponseComment {
  comments: ComentariDTo[];
  pages: Page;
}
export interface Page {
  totalComments: number;
  totalPages: number;
  pageNumber: number;
}
