import {Media} from './Media';
export interface Place {
  _id?: string;
  name: string;
  info: string;
  image?: string;
  radius: number;
  position: {lat: number, lng: number};
  media?: Media[];
}
