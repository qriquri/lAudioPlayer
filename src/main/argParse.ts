import { BrowserWindow, dialog } from 'electron';
import { isAudio } from './util/util';

export const getSelectedFile = (argv?: string[]) => {
//   console.log(process.argv, argv);
  return analyze(argv ? argv : process.argv);
};

const analyze = (argv: string[]) => {
  if (argv.length < 2) {
    return;
  }
  if (!isAudio(argv[1])) {
    return;
  }
  return argv[1];
};
