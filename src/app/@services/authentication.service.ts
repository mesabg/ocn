/**
 * Global imports
 */
import { Injectable } from '@angular/core';
import { 
    AuthHttp, 
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
        private cta:CTAService){}

    /**
     * Methods
     */

    /**
     * {
     *  token:String
     * }
     */
    public login(username:string, password:string):void{
        this.api.login(username, password)
				.subscribe((response:BackendModel) => {
					if (response.status === 201){
                        sessionStorage.setItem('token', response.data.token);
                        this.redirect();
                    }else {
                        alert(`Login failed :: \n msg :: ${response.msg} \n data :: ${response.data}`);
                    }
				});
    };

    public logout():void{
        this.api.logout()
				.subscribe((response:BackendModel) => {
					if (response.data === 200) {
                        sessionStorage.removeItem('token');
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

    public isLoggedIn():boolean{
        let token = sessionStorage.getItem('token');
        return !tokenNotExpired() && token != null && token != undefined;
    }
    
    public isGeneral():boolean{
        let token = sessionStorage.getItem('token');
        let decodeToken = this.jwt.decodeToken(token);
        if (decodeToken.type === 'general')
            return true;
        return false;
    }

    public isAdministrator():boolean{
        let token = sessionStorage.getItem('token');
        let decodeToken = this.jwt.decodeToken(token);
        if (decodeToken.type === 'administrator')
            return true;
        return false;
    }

    public getUsername():string{
        let token = sessionStorage.getItem('token');
        let decodeToken = this.jwt.decodeToken(token);
        return decodeToken.username;
    }

    public getType():string{
        let token = sessionStorage.getItem('token');
        let decodeToken = this.jwt.decodeToken(token);
        return decodeToken.type;
    }

    public redirect():void{
        let token = sessionStorage.getItem('token');

        if (this.isLoggedIn()){
            let decodeToken = this.jwt.decodeToken(token);
            switch (decodeToken.type) {
                case 'reader':
                    this.cta.readerView();
                    break;
                case 'creator':
                    this.cta.creatorView();
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
    }
}