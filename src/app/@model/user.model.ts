/**
 * User model interface
 * @param name => Name of the user
 * @param email => User's email
 * @param password => User's password encrypted
 * @param type => User type ['administrator', 'general']
 */
export interface User {
    id:Number;
    name:string;
    photo:string;
    email:string;
    password:string;
    type:string;
};