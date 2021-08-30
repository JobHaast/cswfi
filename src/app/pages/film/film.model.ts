import { Actor } from '../actor/actor.model';
import { Screening } from '../screening/screening.model';

export class Film {
  _id: string;
  title: string;
  released: Date;
  runtime: number;
  rated: string[];
  rating: number;
  description: string;
  genres: string[];
  banner: File;
  actors: Actor[];
  screenings?: Screening[];
}

export enum Ratings {
  G = 'G',
  PG = 'PG',
  PG13 = 'PG-13',
  R = 'R',
  NC17 = 'NC-17',
}

export enum Genres {
  Action = 'Action',
  Adult = 'Adult',
  Adventure = 'Adventure',
  Avantgarde = 'Avant-garde',
  Experimental = 'Experimental',
  Childrens = 'Children`s',
  Family = 'Family',
  Comdey = 'Comdey',
  ComdeyDrama = 'Comedy Drama',
  Crime = 'Crime',
  Drama = 'Drama',
  Epic = 'Epic',
  Fantasy = 'Fantasy',
  HistoricalFilm = 'Historical Film',
  Horror = 'Horror',
  Muscical = 'Musical',
  Mystery = 'Mystery',
  Romance = 'Romance',
  ScienceFiction = 'Science Fiction',
  SpyFilm = 'Spy Film',
  Thriller = 'Thriller',
  War = 'War',
  Western = 'Western',
}
