import { setItem } from '../../../src/renderer/slice/SoundPlayerSlice';
import { setupStore } from '../../../src/renderer/Store';

describe('setItem', () => {
  test('正しく追加できる', () => {
    const store = setupStore();
    store.dispatch(
      setItem([
        { path: 'foo.mp3', stats: {} as any },
        { path: 'hoge.mp3', stats: {} as any },
      ]),
    );
    const afterState = store.getState().soundPlayer.item;
    expect(afterState).toEqual({
      0: { path: 'foo.mp3', stats: {} as any },
      1: { path: 'hoge.mp3', stats: {} as any },
    });
  });
});
