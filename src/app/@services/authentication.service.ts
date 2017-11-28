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
    public async login(username:string, password:string):Promise<string>{
        try {
            //-- Manage API login
            let response = await this.api.login(username, password).toPromise();
            if (response.state != "success") throw new Error("Login failed");
            await this.storage.set('token', response.data.token);
            let user = await this.api.getUserData().toPromise();

            //-- Save user
            await this.storage.set('user', {
                id: user.data.id,
                name: user.data.name,
                photo: user.data.photo,
                email: user.data.email,
                password: user.data.password,
                type: response.data.type
            });

            return response.data.type; 
        } catch (reason) {
            console.log("An error ocurred :: ", reason);
            alert("Error al iniciar sesión");
            return "not-logged-in";
        }
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

    public async isLoggedIn():Promise<{
        loggedIn:boolean,
        type:string
    }>{
        try {
            let token = await this.storage.get('token');
            let loggedIn = !tokenNotExpired() && token != null && token != undefined;
            if (!loggedIn) throw new Error("User is not logged in");
            let user:UserModel = await this.storage.get('user');
            return {
                loggedIn: loggedIn,
                type: user.type
            }
        } catch (reason) {
            console.log("An error ocurred here (while checking isLoggedIn) :: ", reason);
            return {
                loggedIn: false,
                type: null
            };
        }
    }
    
    public async isGeneral():Promise<boolean>{
        try {
            let user:UserModel = await this.storage.get('user');
            if (user.type === "employee") return true;
            return false;
        } catch (reason) {
            console.log("An error ocurred :: ", reason);
        }
    }

    public async isAdministrator():Promise<boolean>{
        try {
            let user:UserModel = await this.storage.get('user');
            if (user.type === 'administrator' || user.type === 'root' || user.type === 'supervisor') return true;
            return false;
        } catch (reason) {
            console.log("An error ocurred :: ", reason);
        }
    }

    public async getUser():Promise<UserModel>{
        try {
            return await this.storage.get('user');
        } catch (reason) {
            console.log("An error ocurred :: ", reason);
        }
    }
}