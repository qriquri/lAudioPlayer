import { Howl } from 'howler';

export class HowlerWrapper {
  private player: Howl;
  private src = '';
  private currentSeek = 0;
  private volume = 1;
  private loop = false;
  public getPlayer(): Howl {
    return this.player;
  }
  public getSrc = () => {
    return this.src;
  };
  public getLoop = () => {
    return this.loop;
  };
  public setVolume = (val: number) => {
    this.volume = val;
    this.player?.volume(val);
  };
  public setLoop = (val: boolean) => {
    this.loop = val;
    this.player?.loop(this.loop);
  };
  public load = (
    src: string,
    loadCallback?: () => void,
    endCallback?: () => void,
  ) => {
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: src,
      volume: this.volume,
      html5: true,
      loop: this.loop,
    });
    this.src = src;
    this.currentSeek = 0;
    this.player.once('load', loadCallback);
    this.player.on('end', endCallback);
  };
  public playSeek = () => {
    console.log('playSeek', this.src);
    console.log(this.currentSeek);
    this.player.play();
    this.player.seek(this.currentSeek);
  };
  public seek = (per: number) => {
    if (!this.player) {
      return;
    }
    this.player.seek(this.player.duration() * per);
    this.currentSeek = this.player.seek();
  };
  public pause = () => {
    console.log('pause');
    this.player.pause();
    this.currentSeek = this.player.seek();
    // console.log(this.currentSeek);
  };
}

const SoundPlayer = new HowlerWrapper();
export default SoundPlayer;
