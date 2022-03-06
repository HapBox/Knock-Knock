import { FileTypes } from '../../../utils/constants';

export default class SAFileModels {
  static resFileDB = {
    id: 'UUID',
    extension: '.png/.mp4/.docx',
    size: 0,
    originalName: 'orginal name',
    type: Object.values(FileTypes).join('/'),
    url: 'https://localhost:3001/MEDIA_FOLDER/type/id/extension',
  };
}