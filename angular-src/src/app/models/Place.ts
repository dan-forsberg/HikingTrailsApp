import {Media} from './Media';
import {PlacePosition} from './PlacePosition';
export interface Place {
  _id: string;
  name: string;
  info: string;
  image?: string;
  radius: number;
  position: PlacePosition;
  media: Media[];
}
