import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '.././user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '.././validation.service';

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
  constructor(private userService:UserService,private router:Router,private formBuilder: FormBuilder) {
    userService.signup=false;
    
    this.userForm = this.formBuilder.group({
      'first_name': ['', Validators.required],
      'last_name' : ['', Validators.required],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'password': ['', [Validators.required,ValidationService.passwordValidator]],
      'password_confirmation': ['', [Validators.required,ValidationService.passwordValidator]]
    },
    {
      validator: ValidationService.MatchPassword // your validation method 
    });
    
 

   }

  ngOnInit() {
  }
  onSignIn()
  {
    this.router.navigate(['\login']);
  }
  saveUser() {
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
      let firstName=this.userForm.value.first_name,
          lastName=this.userForm.value.last_name,
          email=this.userForm.value.email,
          password=this.userForm.value.password;
        this.user={
        firstName:this.userForm.value.first_name,
        lastName:this.userForm.value.last_name,
        password:this.userForm.value.password,
        email:this.userForm.value.email,
        role:role,
        created_at:"",
        updated_at:updated_at,
      }
      let that=this;
      this.userService.addUser(this.user).subscribe(
        function(response){
          console.log(response);
          let routeThat=that;
          let responseData=response._body;
          this.user_info=JSON.parse(responseData);
          if(this.user_info.success===true)
          routeThat.router.navigate(['\login']);
          if(this.user_info.errmsg!=='')
          routeThat.user_error="User Already Registered!!!";
          console.log(responseData);
        }
      )

     
    }
  }
  ngOnDestroy(){
    this.userService.signup=true;
  }
}
