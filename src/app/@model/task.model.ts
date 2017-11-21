import { User } from './user.model';
import { Comment } from './comment.model';

export interface Task {
    id:Number;
    name:string;
    isActive:Boolean;
    description:string;
    assignedTo:User;
    start:Date;
    end?:Date;
    comments?:Comment[];
};