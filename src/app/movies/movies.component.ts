import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movies } from '../movies';
import { UserService } from '.././user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  moviesList:Movies[];
  moviesList1:Movies[];
  moviesLanguageList:Movies[];
  errorMessage:string;
  constructor(private userService:UserService,private router:Router) {
    this.userService.logout=true;
    this.userService.login=false;
    this.userService.signup=false;
   }

  ngOnInit() {
    this.getMovieList();
    this.getMovieList1();
    this.getMovieLanguageList();
  }
  ngOnDestroy(){
    this.userService.logout=false;
    this.userService.login=true;
    this.userService.signup=true;
  }
  getMovieList()
  {
    this.userService.getMovieList().subscribe(
        moviesList => this.moviesList = moviesList,
        error => this.errorMessage = <any>error
    );
  }
  getMovieList1()
  {
    this.userService.getMovieList1().subscribe(
      // function(response){
      //     this.moviesList1=response;
      //     console.log(this.moviesList1);
      // }
        moviesList1 => this.moviesList1 = moviesList1,
        error => this.errorMessage = <any>error
    );
  }
  getMovieLanguageList()
  {
    this.userService.getMovieLanguageList().subscribe(
      moviesLanguageList => this.moviesLanguageList = moviesLanguageList,
      error => this.errorMessage= <any>error
    )
  }
movieGenres(genre)
{
  console.log(genre);
  let that=this;
  this.userService.getMovieDetailsByGenre(genre).subscribe(
    function(response){
          let nextThat=that;
      console.log(response);
      console.log(typeof response);
      if(response.status===true)
      {
        localStorage.setItem('showInfo',JSON.stringify(response.data));
        console.log('hello');
        nextThat.router.navigate(['/details']);
      }

    });
}
movieLanguage(language)
{
  console.log(language);
  let that=this;
  this.userService.getMovieDetailsByLanguage(language).subscribe(
    function(response){
          let nextThat=that;
      console.log(response);
      console.log(typeof response);
      if(response.status===true)
      {
        localStorage.setItem('showInfo',JSON.stringify(response.data));
        console.log("Hello");
        nextThat.router.navigate(['/details']);
      }
    });
}
}
