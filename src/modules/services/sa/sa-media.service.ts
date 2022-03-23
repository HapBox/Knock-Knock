import { UploadedFile } from 'express-fileupload';
import FileDB from '../../../database/models/final/file-db.model';
import { saveFileIntoDB } from '../../../utils/utils-file';

export default class SAMediaService {
  static async uploadMedia(file: UploadedFile) {
    let image: FileDB = (await saveFileIntoDB(file))!;
    return image;
  }
}
