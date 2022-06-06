import {model, Schema} from 'mongoose';
import {IBook} from '../ts/interfaces';

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  authors: {
    type: String,
    required: true,
  },
  favorite: String,
  fileCover: String,
  fileName: String,
});

export = model<IBook & Document>('Book', bookSchema);
