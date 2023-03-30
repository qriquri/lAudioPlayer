import * as path_util from 'path';
import mime from 'mime-types'
export const isDev = () => process.env.NODE_ENV === 'development';
export const appIcon = isDev() ? `./assets/icon.ico` : `${__dirname}/assets/icon.ico`;
export const isAudio = (path: string) => {
    const type = mime.lookup(path_util.extname(path))
    return type && /^audio\//.test(type);
}