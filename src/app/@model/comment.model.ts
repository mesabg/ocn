import { User } from './user.model';

export interface Comment {
    id:Number,
    content:string,
    publishedBy:User,
    date:Date
}