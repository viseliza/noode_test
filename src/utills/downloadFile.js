import fetch from 'node-fetch';
import * as fs from 'fs';

export const DownloadFile = (url) => {
    fetch(url)
    .then(res => res.buffer())
    .then(buffer => fs.writeFileSync('zamena.doc', buffer))
}