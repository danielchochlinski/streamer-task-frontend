export interface IStreamer {
  inputValue?: string;
  _id: string;
  name: string;
  description: string;
  platforms: string[];
  votes: { up: number; down: number };
  popularity: number;
  image: any;
}
