import {
  setDuration,
  setPlayingIndex,
} from '../../slice/SoundPlayerSlice';
import SoundPlayer from '../../SoundPlayer';
import { store } from '../../Store';

export const playNext = () => {
  console.log('playNext');
  if (SoundPlayer.getLoop()) {
    return;
  }
  store.dispatch(
    setPlayingIndex(store.getState().soundPlayer.playingIndex + 1),
  );
  SoundPlayer.load(
    store.getState().soundPlayer.item[store.getState().soundPlayer.playingIndex]
      .path,
    loadCallback,
    playNext,
  );
  SoundPlayer.playSeek();
};

export const loadCallback = () => {
  store.dispatch(
    setDuration(
      SoundPlayer.getPlayer() ? SoundPlayer.getPlayer().duration() : 0,
    ),
  );
};
