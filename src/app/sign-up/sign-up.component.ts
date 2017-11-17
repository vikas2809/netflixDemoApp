import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '.././user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '.././validation.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userForm: any;
  user:any;
  valid_user:any=[];
  user_info:any={};
  errorMessage:string;
  user_error:string;
  base64:any;
  constructor(private userService:UserService,private router:Router,private formBuilder: FormBuilder) {
    // alert(this.userService.signup);
    // alert(this.userService.login);
    this.userService.signup=false;
    // alert(this.userService.signup=false);
    // this.userService.login=true;
    this.userForm = this.formBuilder.group({
      'first_name': ['', Validators.required],
      'last_name' : ['', Validators.required],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'password': ['', [Validators.required,ValidationService.passwordValidator]],
      'password_confirmation': ['', [Validators.required,ValidationService.passwordValidator]],
      // 'image_pic': [''],
    },
    {
      validator: ValidationService.MatchPassword // your validation method 
    });
    
 

   }

  ngOnInit() {
    this.userService.signup=false;
  }
  onSignIn()
  {
    this.router.navigate(['\login']);
  }

  changeListener(event) {
    console.log(event.target)
    this.encodeImageFileAsURL(event.target)
  }
  encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = (data => {
      this.base64 = reader.result;
      this.user={ image_pic:this.base64}
      console.log(this.base64);
      //console.log('RESULT', reader.result)
    })

    var image=this.base64;
    console.log(image);
    reader.readAsDataURL(file);
    //console.log(this.base64);
  }
  saveUser(image_path) {
    if (this.userForm.dirty && this.userForm.valid) {
      // alert(`Name: ${this.userForm.value.first_name} Email: ${this.userForm.value.email}`);
      let date=Date.now();
      let updated_at=this.userService.transformDate(date);
      //let updated_at= new Date(updated_date);
      console.log(updated_at);
      console.log(typeof updated_at);
      let role='user';
      console.log(this.userForm.value.first_name);
      console.log(this.userForm.value.last_name);
      console.log(this.userForm.value.email);
      console.log(this.userForm.value.password);
      console.log(this.userForm.value.password_confirmation);
      console.log(this.userForm.value.image_path);
      // console.log(this.userForm.value.image_pic);

       //Encrypt the Passwort with Base64
      var key = CryptoJS.enc.Base64.parse("#base64Key#");
      var iv  = CryptoJS.enc.Base64.parse("#base64IV#");
       //Impementing the Key and IV and encrypt the password
      var encrypted = CryptoJS.AES.encrypt(this.userForm.value.password, key, {iv: iv});
      // console.log(encrypted);
      // console.log("Password"+this.userForm.value.password);
        this.user={
        firstName:this.userForm.value.first_name,
        lastName:this.userForm.value.last_name,
        password:encrypted.toString(),
        // password:this.userForm.value.password,
        email:this.userForm.value.email,
        role:role,
        created_at:"",
        updated_at:updated_at,
      }
      console.log(this.user);
      let that=this;
      this.userService.addUser(this.user).subscribe(
        function(response){
          console.log(response);
          let routeThat=that;
          this.user_info=response;
          if(this.user_info.success===true)
          routeThat.router.navigate(['\login']);
          if(response.errmsg!==null&&response.errmsg!==undefined)
          alert("User Already Registered!!!");
          // console.log(responseData);
        }
      )
    }
  }
  ngOnDestroy(){
    this.userService.signup=true;
    // this.userService.login=false;
  }
}
