/**
 * Global imports
 */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { 
    tokenNotExpired, 
    JwtHelper } from 'angular2-jwt';

/**
 * Local imports
 */
import { CTAService } from './cta.service';
import { UserModel, BackendModel } from '../@model';
import { UserApi } from '../@api';

/**
 * Service description
 * - This service manage the session
 */
@Injectable()
export class AuthenticationService {
    /**
     * Variables
     */
    private jwt:JwtHelper = new JwtHelper();

    constructor(
        private api:UserApi,
        private cta:CTAService,
        private storage:Storage){}

    /**
     * Methods
     */

    /**
     * {
     *  token:String
     * }
     */
    public login(username:string, password:string):Promise<string>{
        return new Promise((resolve, reject) => {
            this.api.login(username, password)
                    .subscribe((response:BackendModel) => {
                        if (response.status === 201){
                            this.storage.set('token', response.data.token);
                            this.redirect();
                            let decodeToken = this.jwt.decodeToken(response.data.token);
                            resolve(decodeToken.type);
                        }else {
                            alert(`Login failed :: \n msg :: ${response.msg} \n data :: ${response.data}`);
                            reject();
                        }
                    });
        });
    };

    public logout():void{
        this.api.logout()
				.subscribe((response:BackendModel) => {
					if (response.data === 200) {
                        this.storage.remove('token');
                        alert("Logout success");
                        this.cta.login();
                    } else
						alert(`Login failed :: \n msg :: ${response.msg} \n data :: ${response.data}`);
				});
    };

    public register(user:UserModel):void{
        this.api.register(user).subscribe((response:BackendModel) => {
			if (response.status === 500)
				alert("Register failed :( try again");
			else {
				alert("You are successfully registered :: " + response.msg);
				this.cta.login();
			}
		});
    }

    public isLoggedIn():Promise<{
        loggedIn:boolean,
        type:string
    }>{
        return new Promise((resolve, reject) => {
            this.storage.get('token')
            .then((token) => {
                let loggedIn = !tokenNotExpired() && token != null && token != undefined;
                this.getType()
                .then((type) => {
                    resolve({
                        loggedIn: loggedIn,
                        type: type
                    });
                })
                .catch((reason) => { reject(reason); });
            })
            .catch((reason) => {
                console.log("An error ocurred :: ", reason);
                reject(reason);
            });
        });
    }
    
    public isGeneral():Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.storage.get('token')
            .then((token) => {
                let decodeToken = this.jwt.decodeToken(token);
                if (decodeToken.type === 'general'){
                    resolve(true);
                    return;
                }
                resolve(false);
            })
            .catch((reason) => { console.log("An error ocurred :: ", reason); reject(reason); });
        });
    }

    public isAdministrator():Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.storage.get('token')
            .then((token) => {
                let decodeToken = this.jwt.decodeToken(token);
                if (decodeToken.type === 'administrator'){
                    resolve(true);
                    return;
                }
                resolve(false);
            })
            .catch((reason) => { console.log("An error ocurred :: ", reason); reject(reason); });
        });
    }

    public getUsername():Promise<string>{
        return new Promise((resolve, reject) => {
            this.storage.get('token')
            .then((token) => {
                let decodeToken = this.jwt.decodeToken(token);
                resolve(decodeToken.username);
            })
            .catch((reason) => { console.log("An error ocurred :: ", reason); });
        });
    }

    public getUser():Promise<UserModel>{
        return new Promise((resolve, reject) => {
            this.storage.get('token')
            .then((token) => {
                let decodeToken = this.jwt.decodeToken(token);
                resolve({
                    id: decodeToken.id,
                    name: decodeToken.name,
                    photo: decodeToken.photo,
                    email: decodeToken.email,
                    password: decodeToken.password,
                    type: decodeToken.type
                });
            })
            .catch((reason) => { console.log("An error ocurred :: ", reason); });
        });
    }

    public getType():Promise<string>{
        return new Promise((resolve, reject) => {
            this.storage.get('token')
            .then((token) => {
                if (token === null || token === undefined) reject(token);
                let decodeToken = this.jwt.decodeToken(token);
                resolve(decodeToken.type);
            })
            .catch((reason) => { console.log("An error ocurred :: ", reason); });
        });
    }

    public redirect():void{
        
        this.isLoggedIn()
        .then((auth) => {
            if (auth.loggedIn){
                switch (auth.type) {
                    case 'general':
                        this.cta.generalView();
                        break;
                    case 'administrator':
                        this.cta.administratorView();
                        break;
                    default:
                        this.cta.login();
                        break;
                }
            }else{
                alert('Session is expired');
                this.cta.login();
            }
        })
        .catch((reason) => {
            console.log("An error ocurred :: ", reason);
        });

    }
}