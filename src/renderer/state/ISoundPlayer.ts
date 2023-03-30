import { IFileInfo } from "../../common/IFileInfo";

export interface ISound {
  path: string;
}

export interface ISoundPlayer {
  playingIndex: number;
  isPlaying: boolean;
  duration: number;
  item: {
    [prop: number]: IFileInfo;
  };
}
