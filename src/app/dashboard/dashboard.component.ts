import { Component, OnInit ,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '.././user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '.././validation.service';
import * as CryptoJS from 'crypto-js';
import { detachEmbeddedView } from '@angular/core/src/view/view_attach';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
admin:boolean=false;
user:boolean=false;
superAdmin:boolean=false;
// addEntry:boolean=false;
// updateEntry:boolean=false;
// deleteEntry:boolean=false;
addPopUp:boolean=true;
movieForm:any;
showForm:any;
userDetail:any=[];
movieDetail:any;
tvShowDetail:any;
successMsg:String;
userName:String;

//update movie details data members
completeMovieDetails:any=[];
findMovieForm:any;
errorMsg:String;
movieToBeUpdatedDetails:boolean=false;
validMovieDetails:any=[];
updateMovie:boolean=false;
movieID:string;
movieOrigin:string;
language:string;
name:string;
imgUrl:string;
description:string;
duration:string;
genre:string;

//update tv details data members
findTvShowForm:any;
completeTvShowDetails:any=[];
validTvShowDetails:any=[];
tvShowToBeUpdatedDetails:boolean=false;
showID:string;
showOrigin:string;
updateTvShow:boolean=false;

//delete movies details data members
deleteMovieForm:any;
movieToBeDeleted:boolean=false;
//delete tv details data members
deleteTvShowForm:any;


createUserAdmin:any;
create_admin:any;
user_info:any={};
adminUser:any=[];
validUserDetail:any=[];
userRoleAdminDetail:boolean=false;
base64:any;
  constructor(private formBuilder: FormBuilder,private userService:UserService,private router:Router) {
    this.userService.logout=true;
    this.userService.login=false;
    this.userService.signup=false;
    console.log(this.admin);
    this.admin=this.userService.adminMenu();
    console.log(this.admin);
    this.user= this.userService.userMenu();
    console.log(this.user);
    console.log(this.superAdmin);
    this.superAdmin=this.userService.superAdminMenu();
    this.userDetail=this.userService.getValidUserDetail();
    // if(this.userDetail!==null)
    // {
    console.log(this.userDetail);
    this.userName=this.userDetail.firstName+" "+this.userDetail.lastName;
    console.log(this.userName);

  // }

  //add movie form validators
  this.movieForm = this.formBuilder.group({
    'movieID': ['', Validators.required],
    'movieOrigin' : ['', [Validators.required,ValidationService.categoryValidator]],
    'language': ['', [Validators.required,ValidationService.languageValidator]],
    'name': ['', Validators.required],
    'imgUrl': ['', Validators.required],
    'description': ['', Validators.required],
    'duration': ['', Validators.required],
    'genre': ['', [Validators.required,ValidationService.genreValidator]]
  });

  //add tv shows form validators
  this.showForm = this.formBuilder.group({
    'showID': ['', Validators.required],
    'showOrigin' : ['', [Validators.required,ValidationService.showCategoryValidator]],
    'language': ['', [Validators.required,ValidationService.languageValidator]],
    'name': ['', Validators.required],
    'imgUrl': ['', Validators.required],
    'description': ['', Validators.required],
    'duration': ['', Validators.required],
    'genre': ['', [Validators.required,ValidationService.genreValidator]]
  });

  //update movie form validators
  this.findMovieForm =this.formBuilder.group({
    'movieName': ['',Validators.required]
  });

  //update tv shows form validators
  this.findTvShowForm=this.formBuilder.group({
    'tvShowName': ['',Validators.required]
  });

  //delete movie form validators
  this.deleteMovieForm= this.formBuilder.group({
    'movieName': ['',Validators.required],
    'confirmMovieName': ['',Validators.required]
  });

  //delete tv shows form validators
  this.deleteTvShowForm=this.formBuilder.group({
    'tvShowName': ['',Validators.required],
    'confirmTvShowName': ['',Validators.required]
  })

  //delete tv shows form validators

  //creating admin form validators
  this.createUserAdmin = this.formBuilder.group({
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


  //getting the list of all movies from the database
  this.completeMovieDetails=this.userService.getAllMovieCollection().subscribe(
    movieDetail => {this.completeMovieDetails =movieDetail.respData,
      console.log("Movie Details");
      console.log(this.completeMovieDetails);
    },
    error => this.errorMsg = <any> error
  )

  //getting the complete list of all tv shows from the database
  this.completeTvShowDetails=this.userService.getAllTvShowsCollection().subscribe(
    tvShowsDetail =>{ this.completeTvShowDetails = tvShowsDetail.respData,
      // alert('inside response');
      console.log("Tv Shows Details");
      console.log(this.completeTvShowDetails);
    },
    error => this.errorMsg =<any> error
  )
}

  ngOnInit() {
    // this.adminMenu=this.userService.adminMenu();
    // console.log(this.adminMenu);
    // this.userMenu= this.userService.userMenu();
    // console.log(this.userMenu);
    if(localStorage.getItem('user')==='user')
    {
      this.user=true;
    }
  }

  ngOnDestroy(){
    this.userService.logout=false;
    this.userService.login=true;
    this.userService.signup=true;
    // this.userService.addEntry=true;
  }
  onMovies()
  {
    localStorage.setItem('menu','movie');
    this.router.navigate(['/movies']);
  }
  onTvShow()
  {
    localStorage.setItem('menu','tvShow');
    this.router.navigate(['/shows'])
  }
  searchShows(search)
  {
    console.log(search);
  }
  saveMovie() {
    if (this.movieForm.dirty && this.movieForm.valid) {
      // alert(`Name: ${this.userForm.value.first_name} Email: ${this.userForm.value.email}`);
      let date=Date.now();
      let updated_at=this.userService.transformDate(date);
      //let updated_at= new Date(updated_date);
      console.log(updated_at);
      console.log(typeof updated_at);
      console.log(this.movieForm.value.movieID);
      console.log(this.movieForm.value.movieOrigin);
      console.log(this.movieForm.value.language);
      console.log(this.movieForm.value.name);
      console.log(this.movieForm.value.imgUrl);
      console.log(this.movieForm.value.description);
      console.log(this.movieForm.value.duration);
      console.log(this.movieForm.value.genre);
      this.movieDetail={
        movieID: this.movieForm.value.movieID,
        movieOrigin: this.movieForm.value.movieOrigin,
        language: this.movieForm.value.language,
        name: this.movieForm.value.name,
        imgUrl: this.movieForm.value.imgUrl,
        description : this.movieForm.value.description,
        duration: this.movieForm.value.duration,
        genre: this.movieForm.value.genre,
        created_at: "",
        updated_at: updated_at
      }
        let that=this;
      this.userService.addMovie(this.movieDetail).subscribe(
        function(response)
        {
            console.log(response);
            // let errMsg=response._body;
            // console.log(errMsg);
            // let nextThat=that;
            // // let body=JSON.parse(errMsg);
            // let msg=body.body;
            if(response.success===true){
              // nextThat.successMsg="Created Successfully";\
              alert("inside add post");
              alert("Movie Inserted Successfully");
              this.addPopUp=false;
            }

            // console.log(nextThat.successMsg);
            if(response.errmsg!==undefined)
            {
              console.log(response.errmsg);
              // nextThat.successMsg=body.errmsg;
              alert("Unsuccessfull!!! please try again");
            }
        });

  }
}
saveTvShow()
{
  if (this.showForm.dirty && this.showForm.valid) {
    // alert(`Name: ${this.userForm.value.first_name} Email: ${this.userForm.value.email}`);
    let date=Date.now();
    let updated_at=this.userService.transformDate(date);
    //let updated_at= new Date(updated_date);
    console.log(updated_at);
    console.log(typeof updated_at);
    console.log(this.showForm.value.showID);
    console.log(this.showForm.value.showOrigin);
    console.log(this.showForm.value.language);
    console.log(this.showForm.value.name);
    console.log(this.showForm.value.imgUrl);
    console.log(this.showForm.value.description);
    console.log(this.showForm.value.duration);
    console.log(this.showForm.value.genre);
    this.tvShowDetail={
      showID: this.showForm.value.showID,
      showOrigin: this.showForm.value.showOrigin,
      language: this.showForm.value.language,
      name: this.showForm.value.name,
      imgUrl: this.showForm.value.imgUrl,
      description : this.showForm.value.description,
      duration: this.showForm.value.duration,
      genre: this.showForm.value.genre,
      created_at: "",
      updated_at: updated_at
    }
    let that=this;
    console.log(this.successMsg)
    this.userService.addTvShow(this.tvShowDetail).subscribe(
      function(response)
      {
          console.log(response);
          if(response.success===true){
              console.log(response.success);
            console.log("inside success");
             // nextThat.showMsg="Created Successfully";
             alert("TV Show Inserted Successfully");
          }
          // console.log(nextThat.successMsg);
          // console.log(nextThat.showMsg);
          if(response.errmsg!==undefined)
          {
            console.log(response.errmsg);
            // nextThat.showMsg=body.errmsg;
            alert("Unsuccessfull!!! please try again");
          }
      });
}

}



findMovie() {
  if (this.findMovieForm.dirty && this.findMovieForm.valid) {

    console.log(this.findMovieForm.value.movieName);
    var findmovie=this.findMovieForm.value.movieName;

    this.validMovieDetails=this.completeMovieDetails.filter(function(movie){
      // var searchName=/findmovie/;
      var tempName=movie.name;
      // console.log(searchName);
      console.log(tempName);
      if(tempName.indexOf(findmovie)!==-1)
      {
        return movie;
      }
    })
    if(this.validMovieDetails.length===0)
    alert("No results found");
    else{
      // alert("inside results found");
      console.log(this.validMovieDetails);
      this.movieToBeUpdatedDetails=true;
    }

    }
  }

  updateMovieDetails(id)
  {
    console.log(id);
    this.movieToBeUpdatedDetails=false;
    // this.updateMovie=true;
    console.log("inside Find");
    let that=this;
    this.userService.getMovieDetail(id).subscribe(
      function(response){
        let nextThat=that;
        console.log(response);
        console.log(response.status);
        console.log(response.data);
        if(response.status===true)
        {
          console.log("inside status");
          // let body=JSON.parse(response.data);
          nextThat.movieDetail=response.data;
          localStorage.setItem('updateMovie',JSON.stringify(nextThat.movieDetail));
          console.log(nextThat.movieDetail);
          nextThat.movieID=nextThat.movieDetail.movieID;
          nextThat.movieOrigin=nextThat.movieDetail.movieOrigin;
          nextThat.language=nextThat.movieDetail.language;
          nextThat.name=nextThat.movieDetail.name;
          nextThat.imgUrl=nextThat.movieDetail.imgUrl;
          nextThat.description=nextThat.movieDetail.description;
          nextThat.duration=nextThat.movieDetail.duration;
          nextThat.genre=nextThat.movieDetail.genre;
          nextThat.movieToBeUpdatedDetails=false;
          nextThat.updateMovie=true;
        }
        // nextThat.movieDetail=response.data;
        console.log(nextThat.movieDetail);
      });
  }

  backToUpdateMovie()
  {
    this.movieToBeUpdatedDetails=true;
    this.updateMovie=false;
  }

  updateSelectedMovieDetails(movieID,movieOrigin,language,name,imgUrl,description,duration,genre) {
    if(movieID===undefined||movieID==='')
    this.successMsg="movieID can't be empty";
    if (movieID!==undefined&&movieID!=='') {
          console.log("inside save");
          // console.log(this.movieDetail);
      // alert(`Name: ${this.userForm.value.first_name} Email: ${this.userForm.value.email}`);
      let date=Date.now();
      let updated_at=this.userService.transformDate(date);
      //let updated_at= new Date(updated_date);
      console.log(updated_at);
      console.log(typeof updated_at);
      console.log(movieID);
      console.log(movieOrigin);
      console.log(language);
      console.log(name);
      console.log(imgUrl);
      console.log(description);
      console.log(duration);
      console.log(genre);
      if(movieID!==undefined&&movieOrigin!==undefined&&language!==undefined&&name!==undefined&&imgUrl!==undefined&&description!==undefined&&duration!==undefined&&genre!==undefined)
        {
          this.movieDetail={
            movieOrigin: movieOrigin,
            language: language,
            name: name,
            imgUrl: imgUrl,
            description : description,
            duration: duration,
            genre: genre,
            created_at: "",
            updated_at: updated_at
         }
    console.log(this.movieDetail);
        let that=this;
        this.userService.updateMovie(movieID,this.movieDetail).subscribe(
        function(response)
        {
            console.log(response);
            if(response.status===true)
            {
              console.log(response.status);
              localStorage.removeItem('updateMovie');
                 alert("Updated Successfully");
            }
            if(response.errmsg!==null&&response.errmsg!==undefined)
            {
              console.log(response.errmsg);
              alert("Unsuccessfull!!! please try again");
            }
        });
      }
   }
   this.updateMovie=false;
  }



  findTvShow() {
    if (this.findTvShowForm.dirty && this.findTvShowForm.valid) {

      console.log(this.findTvShowForm.value.tvShowName);
      var findshow=this.findTvShowForm.value.tvShowName;

      this.validTvShowDetails=this.completeTvShowDetails.filter(function(show){
        // var searchName=/findmovie/;
        var tempName=show.name;
        // console.log(searchName);
        console.log(tempName);
        if(tempName.indexOf(findshow)!==-1)
        {
          return show;
        }
      })
      if(this.validTvShowDetails.length===0)
      alert("No results found");
      else{
        // alert("inside results found");
        console.log(this.validTvShowDetails);
        this.tvShowToBeUpdatedDetails=true;
      }

      }
    }

    updateTvShowDetails(id)
    {
      console.log(id);
      this.movieToBeUpdatedDetails=false;
      // this.updateMovie=true;
      console.log("inside Find");
      let that=this;
      this.userService.getTvShowDetail(id).subscribe(
        function(response){
          let nextThat=that;
          console.log(response);
          console.log(response.status);
          console.log(response.data);
          if(response.status===true)
          {
            console.log("inside status");
            // let body=JSON.parse(response.data);
            nextThat.movieDetail=response.data;
            localStorage.setItem('updateMovie',JSON.stringify(nextThat.movieDetail));
            console.log(nextThat.movieDetail);
            nextThat.showID=nextThat.movieDetail.showID;
            nextThat.showOrigin=nextThat.movieDetail.showOrigin;
            nextThat.language=nextThat.movieDetail.language;
            nextThat.name=nextThat.movieDetail.name;
            nextThat.imgUrl=nextThat.movieDetail.imgUrl;
            nextThat.description=nextThat.movieDetail.description;
            nextThat.duration=nextThat.movieDetail.duration;
            nextThat.genre=nextThat.movieDetail.genre;
            nextThat.tvShowToBeUpdatedDetails=false;
            nextThat.updateTvShow=true;
          }
          // nextThat.movieDetail=response.data;
          console.log(nextThat.movieDetail);
        });
    }

    backToUpdateTvShow()
    {
      console.log("inside cancel");
      this.updateTvShow=false;
      this.tvShowToBeUpdatedDetails=true;
    }

    updateSelectedTvShowDetails(showID,showOrigin,language,name,imgUrl,description,duration,genre) {
      if(showID===undefined||showID==='')
      this.successMsg="movieID can't be empty";
      if (showID!==undefined&&showID!=='') {
            console.log("inside save");
            // console.log(this.movieDetail);
        // alert(`Name: ${this.userForm.value.first_name} Email: ${this.userForm.value.email}`);
        let date=Date.now();
        let updated_at=this.userService.transformDate(date);
        //let updated_at= new Date(updated_date);
        console.log(updated_at);
        console.log(typeof updated_at);
        console.log(showID);
        console.log(showOrigin);
        console.log(language);
        console.log(name);
        console.log(imgUrl);
        console.log(description);
        console.log(duration);
        console.log(genre);
        if(showID!==undefined&&showOrigin!==undefined&&language!==undefined&&name!==undefined&&imgUrl!==undefined&&description!==undefined&&duration!==undefined&&genre!==undefined)
          {
            this.tvShowDetail={
              showOrigin: showOrigin,
              language: language,
              name: name,
              imgUrl: imgUrl,
              description : description,
              duration: duration,
              genre: genre,
              created_at: "",
              updated_at: updated_at
           }
      console.log(this.tvShowDetail);
          let that=this;
          this.userService.updateTvShow(showID,this.tvShowDetail).subscribe(
          function(response)
          {
              console.log(response);
              if(response.status===true)
              {
                console.log(response.status);
                localStorage.removeItem('updateMovie');
                   alert("Updated Successfully");

              }
              if(response.errmsg!==null&&response.errmsg!==undefined)
              {
                console.log(response.errmsg);
                alert("Unsuccessfull!!! please try again");
              }
          });
        }
     }
    }


    //method for deleting the movie
    findMovieToBeDeleted()
    {
      if (this.deleteMovieForm.dirty && this.deleteMovieForm.valid) {

            console.log(this.deleteMovieForm.value.movieName);
            console.log(this.deleteMovieForm.value.confirmMovieName);
            if(this.deleteMovieForm.value.movieName===this.deleteMovieForm.value.confirmMovieName)
            {
            var findmovie=this.deleteMovieForm.value.movieName;

            this.validMovieDetails=this.completeMovieDetails.filter(function(movie){
              // var searchName=/findmovie/;
              var tempName=movie.name;
              // console.log(searchName);
              console.log(tempName);
              if(tempName.indexOf(findmovie)!==-1)
              {
                return movie;
              }
            })
            if(this.validMovieDetails.length===0)
            alert("No results found");
            else{
              // alert("inside results found");
              console.log(this.validMovieDetails);
              this.movieToBeDeleted=true;
            }

            }
            else
            {
              alert("confirm movie doesn't match");
            }
          }
    }
    deleteMovieDetails()
    {

    }
    createAdmin()
    {
      if (this.createUserAdmin.dirty && this.createUserAdmin.valid) {
        if(this.base64===undefined)
          alert("Please first select the image");
          else
          {
        console.log("Image"+this.base64);
        console.log(this.createUserAdmin.value.first_name);
        console.log(this.createUserAdmin.value.last_name);
        console.log(this.createUserAdmin.value.email);
        console.log(this.createUserAdmin.value.password);
        console.log(this.createUserAdmin.value.password_confirmation);
        let date=Date.now();
        let updated_at=this.userService.transformDate(date);
        console.log(updated_at);
        console.log(typeof updated_at);
        let role='admin';
        let image_pic=this.base64;
        //Encrypt the Passwort with Base64
      var key = CryptoJS.enc.Base64.parse("#base64Key#");
      var iv  = CryptoJS.enc.Base64.parse("#base64IV#");
       //Impementing the Key and IV and encrypt the password
      var encrypted = CryptoJS.AES.encrypt(this.createUserAdmin.value.password, key, {iv: iv});
      this.create_admin={
        firstName:this.createUserAdmin.value.first_name,
        lastName:this.createUserAdmin.value.last_name,
        password:encrypted.toString(),
        // password:this.userForm.value.password,
        email:this.createUserAdmin.value.email,
        role:role,
        image:image_pic,
        created_at:"",
        updated_at:updated_at,
      }
      console.log(this.create_admin);
      let that=this;
      if(this.base64!==undefined)
      {
      this.userService.addUser(this.create_admin).subscribe(
        function(response){
          console.log(typeof response);
          console.log(response);
          if(response.success===true)
          alert("Created Successfully!!!");
          if(response.errmsg!==null&&response.errmsg!==undefined)
          alert("Admin Already Created!!!");
          // console.log(responseData);
        }
      )
    }
      }
      }
    }
    imageConverter($event)
    {
      alert("inside onchange"+event);
      console.log(event);
      console.log(event.target);
      this.encodeImageFileAsURL(event.target);
   //    var files = event.target.files;
   //   var file = files[0];
   //
   // if (files && file) {
   //     var reader = new FileReader();
   //
   //     reader.onload =this._handleReaderLoaded.bind(this);
   //
   //     reader.readAsBinaryString(file);
   // }
    }
    encodeImageFileAsURL(element) {
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = (data => {
          this.base64 = reader.result;
          // this.user={ image_pic:this.base64}
          this.create_admin={image:this.base64}
          // console.log(this.base64);
          //console.log('RESULT', reader.result)
        })

        var image=this.base64;
        // console.log(image);
        reader.readAsDataURL(file);
        //console.log(this.base64);
    }
    // setAdminImage(email)
    // {
    //   if(this.base64===undefined)
    //   alert("Please first select the image");
    //   else
    //   {
    //     // console.log(this.base64);
    //     var image_pic=this.base64;
    //     alert(this.base64);
    //     // console.log(image);
    //     alert("Image in the upload section"+image_pic+"Image in the upload");
    //   }
    //   let imageDetail={
    //     image:image_pic
    //   }
    //   console.log(imageDetail);
    //   this.userService.updateAdminImage(email,imageDetail)
    // }
    getAllAdmin()
    {
      let role="admin";
      this.userService.getAdminUser(role).subscribe(
      user=>{this.adminUser=user.data,
          console.log(this.adminUser);
      }
      )
    }
    removeUserAdmin(email)
    {
      alert("inside remove user ");
      console.log(email);
      this.userService.deleteAdminUser(email).subscribe(detail=>{
        console.log(typeof detail);
        if(detail.message!==undefined)
        alert("Deleted Successfully");
        this.userRoleAdminDetail=false;
      });
    }
    userAdminDetail(email)
    {
      alert("inside the user admin detail");
      this.userService.getValidUserDetailEmail(email).subscribe(
        user=>{this.validUserDetail=user.data,
          console.log(this.validUserDetail);
          this.userRoleAdminDetail=true;
        })
    }

}
