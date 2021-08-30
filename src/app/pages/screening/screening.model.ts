import { Film } from '../film/film.model';
import { Hall } from '../hall/hall.model';

export class Screening {
  _id: string;
  title: string;
  start: Date;
  end: Date;
  hall: Hall;
  film: Film;
}
