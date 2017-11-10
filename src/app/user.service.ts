import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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

  
getUserDetails()
{
  return this.http.get('http://localhost:7777/api/v1/user/getAllUser').map(res => res.json()).do(data => console.log(data)).catch(this.handleError);
}
  private handleError(error: Response) {
    console.error(error);
    let message = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(message);
      }
}
