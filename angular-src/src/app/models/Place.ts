import {Media} from './Media';
import {Position} from './Position';
export interface Place {
  _id?: string;
  name: string;
  info: string;
  image?: string;
  radius: number;
  position: Position;
  media?: Media[];
}
