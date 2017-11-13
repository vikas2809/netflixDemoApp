import { Component, OnInit } from '@angular/core';
import { UserService } from '.././user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '.././validation.service';

@Component({
  selector: 'app-add-movie-tv-shows',
  templateUrl: './add-movie-tv-shows.component.html',
  styleUrls: ['./add-movie-tv-shows.component.css']
})
export class AddMovieTvShowsComponent implements OnInit {
  movieForm:any;
  showForm:any;
  movieDetail:any;
  tvShowDetail:any;
  successMsg:String;
  showMsg:String;
  constructor(private formBuilder: FormBuilder,private userService:UserService) {
    this.movieForm = this.formBuilder.group({
      'movieID': ['', Validators.required],
      'movieOrigin' : ['', Validators.required],
      'language': ['', Validators.required],
      'name': ['', Validators.required],
      'imgUrl': ['', Validators.required],
      'description': ['', Validators.required],
      'duration': ['', Validators.required],
      'genre': ['', Validators.required]
    });
    this.showForm = this.formBuilder.group({
      'showID': ['', Validators.required],
      'showOrigin' : ['', Validators.required],
      'language': ['', Validators.required],
      'name': ['', Validators.required],
      'imgUrl': ['', Validators.required],
      'description': ['', Validators.required],
      'duration': ['', Validators.required],
      'genre': ['', Validators.required]
    });
  }

  ngOnInit() {
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
            let errMsg=response._body;
            console.log(errMsg);
            let nextThat=that;
            let body=JSON.parse(errMsg);
            let msg=body.body;
            if(body.success===true)
               nextThat.successMsg="Created Successfully";
            console.log(nextThat.successMsg);
            if(body.errmsg!==null)
            {
              console.log(body.errmsg);
              nextThat.successMsg=body.errmsg;
            }
        });

  }
  this.userService.addEntry=false;
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
          let errMsg=response._body;
          console.log(errMsg);
          let nextThat=that;
          let body=JSON.parse(errMsg);
          let msg=body.body;
          console.log(body);
          console.log(body.success);
          if(body.success===true){
              console.log(body.success);
            console.log("inside success");
             // nextThat.showMsg="Created Successfully";
             nextThat.successMsg="Created Successfully";
          }
          console.log(nextThat.successMsg);
          console.log(nextThat.showMsg);
          if(body.errmsg!==undefined)
          {
            console.log(body.errmsg);
            // nextThat.showMsg=body.errmsg;
            nextThat.successMsg=body.errmsg;
          }
      });
}
}
}
