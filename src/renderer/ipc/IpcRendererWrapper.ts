import { IElectronAPI } from 'global';
import { IFileInfo } from '../../common/IFileInfo';
import defaultConfig from '../../../defaultConfig.json';
import { setIsMaxAction } from '../slice/AppSlice';
import {
  setIsPlaying,
  setItem,
  setPlayingIndex,
} from '../slice/SoundPlayerSlice';
import { store } from '../Store';
// eslint-disable-next-line valid-jsdoc
/**
 * Rendererプロセスのipc通信の受信を管理
 */
class IpcRendererWrapper {
  private LOG_TAG = 'IpcRendererReceiver:';
  private ipcSock: IElectronAPI;
  /**
   *
   */
  constructor() {
    this.ipcSock = window.electronAPI;
  }

  /**
   * start listen
   */
  listen(): void {
    // connectチャネルに送信
    this.ipcSock.sendMsg('connect');
    this.listenOpenDirRes();
    this.listenMaximize();
    this.listenResized();
  }

  private listenOpenDirRes(): void {
    this.ipcSock.recvMsg(
      'open-dir-res',
      (
        _: Electron.IpcRendererEvent,
        result: {files: IFileInfo[],
        selectedIndex?: number}
      ) => {
        console.log('open-dir-res', result);
        store.dispatch(setItem(result.files.sort((a, b) => a.stats.birthtime.getTime() - b.stats.birthtime.getTime())));
        store.dispatch(setPlayingIndex(result.selectedIndex ? result.selectedIndex : 0));
        store.dispatch(setIsPlaying(false));
      },
    );
  }

  /** */
  private listenMaximize(): void {
    this.ipcSock.recvMsg('maximize', (_: Electron.IpcRendererEvent) => {
      console.log('maximize');
      store.dispatch(setIsMaxAction(true));
    });
  }
  /** */
  private listenResized(): void {
    this.ipcSock.recvMsg(
      'resized',
      (_: Electron.IpcRendererEvent, isMax: boolean) => {
        console.log('resized');
        store.dispatch(setIsMaxAction(isMax));
      },
    );
  }
}

const IpcRenderer = new IpcRendererWrapper();
Object.freeze(IpcRenderer);
export default IpcRenderer;
