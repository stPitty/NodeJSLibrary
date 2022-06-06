import {model, Schema} from 'mongoose';
import {IUser} from '../ts/interfaces';


const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export = model<IUser & Document>('User', userSchema);
