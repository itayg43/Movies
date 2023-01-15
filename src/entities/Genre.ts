import {GenreJSON} from '../services/tmdbService';

export class Genre {
  id: string;
  value: string;

  constructor(genreJSON: GenreJSON) {
    this.id = genreJSON.id.toString();
    this.value = genreJSON.name;
  }
}
