import { Component, OnInit } from '@angular/core';
import { UserService } from '.././user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '.././validation.service';

@Component({
  selector: 'app-update-movie-tv-shows',
  templateUrl: './update-movie-tv-shows.component.html',
  styleUrls: ['./update-movie-tv-shows.component.css']
})
export class UpdateMovieTvShowsComponent implements OnInit {
  movieForm:any;
  showForm:any;
  movieDetail:any;
  tvShowDetail:any;
  successMsg:String;
  showMsg:String;
  findMovieToBeUpdate:boolean=true;
  updateMovie:boolean=false;
  findShowToBeUpdate:boolean=true;
  updateTvShow:boolean=false;

  movieID:string;
  movieOrigin:string;
  language:string;
  name:string;
  imgUrl:string;
  description:string;
  duration:string;
  genre:string;

showID:string;
showOrigin:string;

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
  findMovie(movieID)
  {
    console.log("inside Find");
    console.log(movieID);
    let that=this;
    this.userService.getMovieDetail(movieID).subscribe(
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
        }
        // nextThat.movieDetail=response.data;
        console.log(nextThat.movieDetail);
      });
      // console.log(that.movieDetail);
      let updateMovieDetail=localStorage.getItem('updateMovie');
      let tempDetail=JSON.parse(updateMovieDetail);
      console.log(tempDetail);
      this.movieID=tempDetail.movieID;
      this.movieOrigin=tempDetail.movieOrigin;
      this.language=tempDetail.language;
      this.name=tempDetail.name;
      this.imgUrl=tempDetail.imgUrl;
      this.description=tempDetail.description;
      this.duration=tempDetail.duration;
      this.genre=tempDetail.genre;

      console.log(this.movieID);
      console.log(this.movieOrigin);
      console.log(this.language);
      console.log(this.name);
      console.log(this.imgUrl);
      console.log(this.description);
      console.log(this.duration);
      console.log(this.genre);
      this.findMovieToBeUpdate=false;
      this.updateMovie=true;
      // console.log(this.movieDetail);
  }
  saveMovie(movieID,movieOrigin,language,name,imgUrl,description,duration,genre) {
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
            let errMsg=response._body;
            console.log(errMsg);
            let nextThat=that;
            let body=JSON.parse(errMsg);
            let msg=body.body;
            if(body.status===true)
            {
              console.log(body.status);
              localStorage.removeItem('updateMovie');
                 nextThat.successMsg="Updated Successfully";
            }
            console.log(nextThat.successMsg);
            // if(body.errmsg!==null)
            // {
            //   console.log(body.errmsg);
            //   nextThat.successMsg=body.errmsg;
            // }
        });
      }
   }
  }


  findTvShow(showID)
  {
    console.log("inside Find");
    console.log(showID);
    let that=this;
    this.userService.getTvShowDetail(showID).subscribe(
      function(response){
        let nextThat=that;
        console.log(response);
        console.log(response.status);
        console.log(response.data);
        if(response.status===true)
        {
          console.log("inside status");
          // let body=JSON.parse(response.data);
          nextThat.tvShowDetail=response.data;
          localStorage.setItem('updateTvShow',JSON.stringify(nextThat.tvShowDetail));
          console.log(nextThat.tvShowDetail);
        }
        // nextThat.movieDetail=response.data;
        console.log(nextThat.tvShowDetail);
      });
      // console.log(that.movieDetail);
      let updateTvShowDetail=localStorage.getItem('updateTvShow');
      let tempDetail=JSON.parse(updateTvShowDetail);
      console.log(tempDetail);
      this.showID=tempDetail.showID;
      this.showOrigin=tempDetail.showOrigin;
      this.language=tempDetail.language;
      this.name=tempDetail.name;
      this.imgUrl=tempDetail.imgUrl;
      this.description=tempDetail.description;
      this.duration=tempDetail.duration;
      this.genre=tempDetail.genre;

      console.log(this.showID);
      console.log(this.showOrigin);
      console.log(this.language);
      console.log(this.name);
      console.log(this.imgUrl);
      console.log(this.description);
      console.log(this.duration);
      console.log(this.genre);
      this.findShowToBeUpdate=false;
      this.updateTvShow=true;
      // console.log(this.movieDetail);
  }



  saveTvShow(showID,showOrigin,language,name,imgUrl,description,duration,genre)
  {
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
            let errMsg=response._body;
            console.log(errMsg);
            let nextThat=that;
            let body=JSON.parse(errMsg);
            let msg=body.body;
            if(body.status===true)
            {
              console.log(body.status);
              localStorage.removeItem('updateTvShow');
                 nextThat.successMsg="Updated Successfully";
            }
            console.log(nextThat.successMsg);
            // if(body.errmsg!==null)
            // {
            //   console.log(body.errmsg);
            //   nextThat.successMsg=body.errmsg;
            // }
        });
      }
   }
  }
}
