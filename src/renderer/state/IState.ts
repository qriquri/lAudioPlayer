import { IApp } from "./IApp";
import { ISoundPlayer } from "./ISoundPlayer";

export interface IState{
    app: IApp;
    soundPlayer: ISoundPlayer;
    // explorer: IExplorer;
}