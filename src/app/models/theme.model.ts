import { ThemeFilenameModel } from './theme-filename.model';

export interface ThemeModel {
  name: string;
  filename: ThemeFilenameModel;
  image: string;
}
