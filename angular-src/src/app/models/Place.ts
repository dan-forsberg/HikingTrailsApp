export interface Place {
  _id: string;
  name: string;
  info: string;
  image?: string;
  radius: number;
  position: object;
  media: object[];
}
