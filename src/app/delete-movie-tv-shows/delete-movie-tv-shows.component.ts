import { Component, OnInit } from '@angular/core';
import { UserService } from '.././user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '.././validation.service';

@Component({
  selector: 'app-delete-movie-tv-shows',
  templateUrl: './delete-movie-tv-shows.component.html',
  styleUrls: ['./delete-movie-tv-shows.component.css']
})
export class DeleteMovieTvShowsComponent implements OnInit {
  movieForm:any;
  showForm:any;
  successMsg:String;
  constructor(private userService:UserService,private router:Router,private formBuilder: FormBuilder) {
    this.movieForm = this.formBuilder.group({
      'movieID': ['', Validators.required],
      'confirm_movieID' : ['', Validators.required]
    });
    this.showForm = this.formBuilder.group({
      'showID': ['', Validators.required],
      'confirm_showID' : ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  deleteMovie()
  {
    if (this.movieForm.dirty && this.movieForm.valid) {
      console.log(this.movieForm.value.movieID);
      console.log(this.movieForm.value.confirm_movieID);
      if(this.movieForm.value.movieID!==this.movieForm.value.confirm_movieID)
        this.successMsg="confirm_movieID doesn't match";
        let that=this;
      if(this.movieForm.value.movieID===this.movieForm.value.confirm_movieID)
      {
        let nextThat=that;
        this.userService.deleteMovie(this.movieForm.value.movieID).subscribe(
          function(response)
          {
            console.log(response);
              console.log(typeof response);
             nextThat.successMsg=response.message;
          });
      }
    }
  }

  deleteTvShow()
  {
    if (this.showForm.dirty && this.showForm.valid) {
      console.log(this.showForm.value.showID);
      console.log(this.showForm.value.confirm_showID);
      if(this.showForm.value.showID!==this.showForm.value.confirm_showID)
        this.successMsg="confirm_showID doesn't match";
        let that=this;
      if(this.showForm.value.showID===this.showForm.value.confirm_showID)
      {
        let nextThat=that;
        this.userService.deleteTvShow(this.showForm.value.showID).subscribe(
          function(response)
          {
            console.log(response);
              console.log(typeof response);
             nextThat.successMsg=response.message;
             console.log(nextThat.successMsg);
          });
      }
    }
  }
  onCancel()
  {
    console.log("inside cancel");
    this.router.navigate(['/dashboard']);
  }
}
