import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Movies } from './movies';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  signup:boolean=true;
  login:boolean=true;
  logout:boolean=false;
  valid_user:any=[];
  admin:boolean=false;
  user:boolean=false;
  updateEntry:boolean=false;
  addEntry:boolean=false;
  deleteEntry:boolean=false;
  constructor(private http:Http,private datePipe:DatePipe,private router:Router) { }
  authenticateUser(user)
  {
        console.log(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:7777/api/v1/user/authenticateUser',user,options)
        .do(
          data => console.log(data)
        )
        .catch(this.handleError);
  }
  logoutUser()
  {
    if(localStorage.getItem('token')!==undefined||localStorage.getItem('token')!='')
    {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('UserInfo');
      localStorage.removeItem('ShowInfo');
      localStorage.removeItem('menu');
      localStorage.removeItem('showInfo');
      this.router.navigate(['\logout']);
    }
  }

  transformDate(myDate) {
    console.log(myDate);
    return this.datePipe.transform(myDate, 'yyyy-MM-dd hh:mm:ss');
  }

  addUser(user)
  {
   console.log(user);
   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });
    //let body = JSON.stringify(user);
  // console.log(body);
   return this.http.post('http://localhost:7777/api/v1/user/create',user,options)
   .do(data => console.log(data))
   .catch(this.handleError)
  }

  addMovie(movieDetail)
  {
    console.log(movieDetail);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
     //let body = JSON.stringify(user);
   // console.log(body);
    return this.http.post('http://localhost:7777/api/v1/movies/createMovie',movieDetail,options)
    .do(data => console.log(data))
    .catch(this.handleError)
  }

  addTvShow(tvShowDetail)
  {
    console.log(tvShowDetail);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
     //let body = JSON.stringify(user);
   // console.log(body);
    return this.http.post('http://localhost:7777/api/v1/tvshows/createShow',tvShowDetail,options)
    .do(data => console.log(data))
    .catch(this.handleError)
  }
  getMovieDetail(movieID)
  {
    console.log(movieID);
      return this.http.get('http://localhost:7777/api/v1/movies/getMovieDetail/'+movieID)
      .map(res => res.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }
  getTvShowDetail(showID)
  {
    console.log(showID);
      return this.http.get('http://localhost:7777/api/v1/tvshows/getTvShowDetail/'+showID)
      .map(res => res.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  getMovieDetailByName(name)
  {
    console.log(name);
      return this.http.get('http://localhost:7777/api/v1/movies/getMovieByName/'+name)
      .map(res => res.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }
  getTvShowDetailByName(name)
  {
    console.log(name);
      return this.http.get('http://localhost:7777/api/v1/tvshows/getTvShowDetailByName/'+name)
      .map(res => res.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  getMovieDetailsByLanguage(language)
  {
    console.log(language);
      return this.http.get('http://localhost:7777/api/v1/movies/getMovieByLanguage/'+language)
      .map(res => res.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }
  getTvShowDetailsByLanguage(language)
  {
    console.log(language);
      return this.http.get('http://localhost:7777/api/v1/tvshows/getTvShowByLanguage/'+language)
      .map(res => res.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }
  getMovieDetailsByGenre(genre)
  {
    console.log(genre);
      return this.http.get('http://localhost:7777/api/v1/movies/getMovieByGenre/'+genre)
      .map(res => res.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }
  getTvShowDetailsByGenre(genre)
  {
    console.log(genre);
      return this.http.get('http://localhost:7777/api/v1/tvshows/getTvShowByGenre/'+genre)
      .map(res => res.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }
  updateMovie(movieID,movieDetail)
  {
    console.log(movieID);
    console.log(movieDetail);
    let headers =new Headers({ 'Content-Type' : 'application/json'});
    let options =new RequestOptions({ headers: headers });

    return this.http.put('http://localhost:7777/api/v1/updateMovieDetails/'+movieID,movieDetail,options)
    .do( date => console.log(date))
    .catch(this.handleError);
  }
  updateTvShow(showID,tvShowDetail)
  {
    console.log(showID);
    console.log(tvShowDetail);
    let headers =new Headers({ 'Content-Type' : 'application/json'});
    let options =new RequestOptions({ headers: headers });

    return this.http.put('http://localhost:7777/api/v1/tvshows/updateTvShowDetail/'+showID,tvShowDetail,options)
    .do( date => console.log(date))
    .catch(this.handleError);
  }
  deleteMovie(movieID)
  {
    console.log(movieID);
    return this.http.delete('http://localhost:7777/api/v1/deleteMovie/'+movieID)
    .map(res => res.json())
    .do(data => console.log(data))
    .catch(this.handleError);
  }
  deleteTvShow(showID)
  {
    console.log(showID);
    return this.http.delete('http://localhost:7777/api/v1/deleteTvShow/'+showID)
    .map(res => res.json())
    .do(data => console.log(data))
    .catch(this.handleError);
  }
  adminMenu()
  {
    console.log("inside admin menu in the user service");
console.log(localStorage.getItem('user'));
console.log(typeof localStorage.getItem('user'));
    if(localStorage.getItem('user')==='admin')
    {
      console.log("inside if");
          console.log(this.admin);
            return this.admin=true;
    }
    if(localStorage.getItem('user')!=='admin')
    {
      console.log("inside if");
          console.log(this.admin);
            return this.admin=false;
    }

  }
  userMenu()
  {
    if(localStorage.getItem('user')==='user')
    {
      console.log(this.user);
          return this.user=true;
    }
  }

  getValidUserDetail()
  {
    if(localStorage.getItem('UserInfo')!==null)
    {
      let valid_user;
      valid_user=localStorage.getItem('UserInfo');
      console.log(valid_user);
      return JSON.parse(valid_user);
    }
  }
getUserDetails()
{
  return this.http.get('http://localhost:7777/api/v1/user/getAllUser').map(res => res.json()).do(data => console.log(data)).catch(this.handleError);
}

getAllTvShowsCollection()
{
  return this.http.get('http://localhost:7777/api/v1/tvshows/getAllTvShows').subscribe();
}
getMovieList(): Observable<Movies[]>
{
  return this.http
        .get('assets/imagesList/movies.json')
        .map((response: Response) =><Movies[]> response.json())
        .do(data => console.log(data))
        .catch(this.handleError);
}

getMovieList1(): Observable<Movies[]>
{
  return this.http
        .get('assets/imagesList/movies1.json')
        .map((response: Response) =><Movies[]> response.json())
        .do(data => console.log(data))
        .catch(this.handleError);
}
getMovieLanguageList():Observable<Movies[]>
{
  return this.http
        .get('assets/imagesList/movieLanguage.json')
        .map((response: Response) =><Movies[]> response.json())
        .do(data => console.log(data))
        .catch(this.handleError);
}

getTvShowList(): Observable<Movies[]>
{
  return this.http
        .get('assets/imagesList/tvShowsInfo.json')
        .map((response: Response) =><Movies[]> response.json())
        .do(data => console.log(data))
        .catch(this.handleError);
}

getTvShowList1(): Observable<Movies[]>
{
  return this.http
        .get('assets/imagesList/tvShowInfo1.json')
        .map((response: Response) =><Movies[]> response.json())
        .do(data => console.log(data))
        .catch(this.handleError);
}
getTvShowLanguageList():Observable<Movies[]>
{
  return this.http
        .get('assets/imagesList/tvShowLanguage.json')
        .map((response: Response) =><Movies[]> response.json())
        .do(data => console.log(data))
        .catch(this.handleError);
}
  private handleError(error: Response) {
    console.error(error);
    let message = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(message);
      }
}
