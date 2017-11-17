import { Component, OnInit ,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '.././user.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  valid_user:any=[];
  userError:String;
  title:String="Hello";
  constructor(private router:Router,private userService:UserService) {
    this.userService.login=false;
    console.log(this.userError);
   }

  ngOnInit() {
  }
  onCreateAccount()
  {
      this.router.navigate(['\sign']);
  }
  ngOnDestroy()
  {
    this.userService.login=true;
  }
  onSubmit(email,password)
  {
    console.log(email);
    console.log(password);
    //Encrypt the Passwort with Base64
    var key = CryptoJS.enc.Base64.parse("#base64Key#");
    var iv  = CryptoJS.enc.Base64.parse("#base64IV#");
     //Impementing the Key and IV and encrypt the password
    var encrypted = CryptoJS.AES.encrypt(password, key, {iv: iv});
    this.valid_user={
      email,password:encrypted.toString()
    }
    let that=this;
    this.userService.authenticateUser(this.valid_user).subscribe(
      function(response) {
        console.log(typeof response);
        console.log(response.data)
        let routeThat=that;
        let userData=response;
        console.log(userData)
        if(userData!==null)
        {
        this.valid_user=userData.data;
        let token=userData.token;
        if(userData.success===true)
        {
        localStorage.setItem('user',this.valid_user.role);
        localStorage.setItem('UserInfo',JSON.stringify(this.valid_user));
        localStorage.setItem('token',JSON.stringify(token));
        routeThat.router.navigate(['\dashboard']);
        }
        else
        {
        let msgErr=userData.message;
        if(msgErr==="Authentication failed. User not found.")
        routeThat.userError="Authentication failed. User not found.";
        if(msgErr==="Authentication failed. Wrong password.")
        routeThat.userError="Authentication failed. Wrong password.";
        console.log(this.userError);
        }
        }
        else
        this.userError="User Doesn't Exists";
      });
  }
}
