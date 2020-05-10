import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const pathResolve = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: pathResolve,

  storage: multer.diskStorage({
    destination: pathResolve,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');

      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
