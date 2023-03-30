import fs from 'fs';
export interface IFileInfo {
  path: string;
  stats: fs.Stats;
}
