import { OMDB_TYPE } from "../enums/OMDB_TYPE.enum";

export interface Movie {
  title: string;
  poster: string;
  year: string;
  type: OMDB_TYPE;
  id: string;
}
