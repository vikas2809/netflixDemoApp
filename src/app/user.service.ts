import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Movies } from './movies';
import 'rxjs/add/operator/map';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  signup:boolean=true;
  login:boolean=true;
  logout:boolean=false;
  valid_user:any=[];
  admin:boolean=false;
  superAdmin:boolean=false;
  user:boolean=false;
  updateEntry:boolean=false;
  addEntry:boolean=false;
  deleteEntry:boolean=false;
  public url:string='http://localhost:7777/api/';
  // let headers = new Headers({ 'Content-Type': 'application/json' });
  // let options = new RequestOptions({ headers: headers });
  public headers =new Headers({'Content-Type':'application/json'});
  // public options = new RequestOptions({ headers: this.headers})
  options:RequestOptions;

  constructor(private http:Http,private datePipe:DatePipe,private router:Router) {
    this.options = new RequestOptions({headers: this.headers});
   }
  authenticateUser(user)
  {
        console.log(user);
        return this.http.post(this.url+'v1/user/authenticateUser',user,this.options)
        .map(res=>res.json());
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
   console.log(this.url+'v1/user/create');
   return this.http.post(this.url+'v1/user/create',user,this.options)
   .map(res=>res.json());
  }

  addMovie(movieDetail)
  {
    console.log(movieDetail);
    return this.http.post(this.url+'v1/movies/createMovie',movieDetail,this.options).map(res=>res.json());
  }

  addTvShow(tvShowDetail)
  {
    console.log(tvShowDetail);
    return this.http.post(this.url+'v1/tvshows/createShow',tvShowDetail,this.options)
    .map(res=>res.json());
  }
  getMovieDetail(movieID)
  {
    console.log(movieID);
      return this.http.get(this.url+'v1/movies/getMovieDetail/'+movieID)
      .map(res => res.json());
  }
  getTvShowDetail(showID)
  {
    console.log(showID);
      return this.http.get(this.url+'v1/tvshows/getTvShowDetail/'+showID)
      .map(res => res.json());
  }

  getMovieDetailByName(name)
  {
    console.log(name);
      return this.http.get(this.url+'v1/movies/getMovieByName/'+name)
      .map(res => res.json());
  }
  getTvShowDetailByName(name)
  {
    console.log(name);
      return this.http.get(this.url+'v1/tvshows/getTvShowDetailByName/'+name)
      .map(res => res.json());
  }

  getMovieDetailsByLanguage(language)
  {
    console.log(language);
      return this.http.get(this.url+'v1/movies/getMovieByLanguage/'+language)
      .map(res => res.json());
  }
  getTvShowDetailsByLanguage(language)
  {
    console.log(language);
      return this.http.get(this.url+'v1/tvshows/getTvShowByLanguage/'+language)
      .map(res => res.json());
  }
  getMovieDetailsByGenre(genre)
  {
    console.log(genre);
      return this.http.get(this.url+'v1/movies/getMovieByGenre/'+genre)
      .map(res => res.json());
  }
  getTvShowDetailsByGenre(genre)
  {
    console.log(genre);
      return this.http.get(this.url+'v1/tvshows/getTvShowByGenre/'+genre)
      .map(res => res.json());
  }
  updateMovie(movieID,movieDetail)
  {
    console.log(movieID);
    console.log(movieDetail);

    return this.http.put(this.url+'v1/updateMovieDetails/'+movieID,movieDetail,this.options)
    .map(res=>res.json());
  }
  updateTvShow(showID,tvShowDetail)
  {
    console.log(showID);
    console.log(tvShowDetail);

    return this.http.put(this.url+'v1/tvshows/updateTvShowDetail/'+showID,tvShowDetail,this.options)
    .map(res=>res.json());
  }
  deleteMovie(movieID)
  {
    console.log(movieID);
    return this.http.delete(this.url+'v1/deleteMovie/'+movieID)
    .map(res => res.json());
  }
  deleteTvShow(showID)
  {
    console.log(showID);
    return this.http.delete(this.url+'v1/deleteTvShow/'+showID)
    .map(res => res.json());
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
  superAdminMenu()
  {
    if(localStorage.getItem('user')==='superAdmin')
    {
    console.log("inside if");
        console.log(this.superAdmin);
        // this.admin=true;
          return this.superAdmin=true;
    }
    if(localStorage.getItem('user')!=='superAdmin')
    {
    console.log("inside if");
        console.log(this.superAdmin);
        // this.admin=false;
          return this.superAdmin=false;
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
  return this.http.get(this.url+'v1/user/getAllUser').map(res => res.json());
}

getValidUserDetailEmail(email)
{
  return this.http.get(this.url+'v1/user/getValidUser/'+email).map(res=>res.json());
}

getAdminUser(role)
{
  return this.http.get(this.url+'v1/user/getUserRole/'+role).map(res=>res.json());
}

deleteAdminUser(email)
{
  return this.http.delete(this.url+'v1/user/deleteUser/'+email)
  .map(res => res.json());
}

updateAdminImage(email,imageDetail)
{
  console.log(email);
  console.log(imageDetail);

  if(imageDetail!==undefined)
  {
      console.log(imageDetail);
      return this.http.put(this.url+'v1/user/updateUserImage/'+email,imageDetail,this.options).map(res=>res.json());
  }
  //  return this.http.put(this.url,'v1/user/updateUserImage/'+email,imageDetail,this.options).map(res=>res.json());
}

getAllTvShowsCollection()
{
  return this.http.get(this.url+'v1/tvshows/getAllTvShows')
  .map(res => res.json());
}

getAllMovieCollection()
{
  return this.http.get(this.url+'v1/movies/getAllMovies')
  .map(res => res.json());
}

getMovieList(): Observable<Movies[]>
{
  return this.http
        .get('assets/imagesList/movies.json')
        .map((response: Response) =><Movies[]> response.json());
}

getMovieList1(): Observable<Movies[]>
{
  return this.http
        .get('assets/imagesList/movies1.json')
        .map((response: Response) =><Movies[]> response.json());
}
getMovieLanguageList():Observable<Movies[]>
{
  return this.http
        .get('assets/imagesList/movieLanguage.json')
        .map((response: Response) =><Movies[]> response.json());
}

getTvShowList(): Observable<Movies[]>
{
  return this.http
        .get('assets/imagesList/tvShowsInfo.json')
        .map((response: Response) =><Movies[]> response.json());
}

getTvShowList1(): Observable<Movies[]>
{
  return this.http
        .get('assets/imagesList/tvShowInfo1.json')
        .map((response: Response) =><Movies[]> response.json());
}
getTvShowLanguageList():Observable<Movies[]>
{
  return this.http
        .get('assets/imagesList/tvShowLanguage.json')
        .map((response: Response) =><Movies[]> response.json());
}
}
