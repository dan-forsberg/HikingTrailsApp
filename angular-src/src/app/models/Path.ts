import {PlacePosition} from './PlacePosition';

export interface Path {
  _id?: number;
  image?: string;
  name: string;
  info: string;
  length: string;
  duration: number;
  places: string[];
  polyline: PlacePosition[];
}
