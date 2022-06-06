import {IVerifyOptions} from 'passport-local';
import {IUser} from './interfaces';


export type TDoneCb = (error: any, user?: IUser | false, options?: IVerifyOptions) => void;
export type TSerializeCb = (error: any, id: string) => void;
export type TDeserializeCb = (error: any, user?: IUser | false | null) => void;

