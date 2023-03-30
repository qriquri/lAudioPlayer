import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFileInfo } from '../../common/IFileInfo';
import { ISoundPlayer } from '../state/ISoundPlayer';

const initialState: ISoundPlayer = {
  playingIndex: 0,
  isPlaying: false,
  duration: 0,
  item: {},
};

export const SoundPlayerSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setPlayingIndex: (state: ISoundPlayer, action: PayloadAction<number>) => {
      console.log(action.payload);
      if (Object.keys(state.item).length <= action.payload) {
        state.playingIndex = 0;
      } else if (action.payload < 0) {
        state.playingIndex = Object.keys(state.item).length - 1;
      } else {
        state.playingIndex = action.payload;
      }
    },
    setIsPlaying: (state: ISoundPlayer, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setDuration: (state: ISoundPlayer, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setItem: (state: ISoundPlayer, action: PayloadAction<IFileInfo[]>) => {
      state.item = {};
      action.payload.map((payload, index) => {
        state.item[index] = payload;
      });
    },
  },
});

export const { setPlayingIndex, setIsPlaying, setDuration, setItem } =
  SoundPlayerSlice.actions;
export default SoundPlayerSlice.reducer;
