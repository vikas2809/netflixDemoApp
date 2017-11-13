import { Component, OnInit ,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '.././user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
admin:boolean=false;
user:boolean=false;
// addEntry:boolean=false;
// updateEntry:boolean=false;
// deleteEntry:boolean=false;
userDetail:any=[];
userName:String;
  constructor(private userService:UserService,private router:Router) {
    this.userService.logout=true;
    this.userService.login=false;
    this.userService.signup=false;
    console.log(this.admin);
    this.admin=this.userService.adminMenu();
    console.log(this.admin);
    this.user= this.userService.userMenu();
    console.log(this.user);
    this.userDetail=this.userService.getValidUserDetail();
    // if(this.userDetail!==null)
    // {
    console.log(this.userDetail);
    this.userName=this.userDetail.firstName+" "+this.userDetail.lastName;
    console.log(this.userName);

  // }
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
  addItem()
  {
    console.log("inside add");
    console.log(this.userService.addEntry);
    this.userService.addEntry=true;
    console.log(this.userService.addEntry);
  }
  updateItem()
  {
    console.log("inside update");
    this.userService.updateEntry=true;
  }
  deleteItem()
  {
    this.userService.deleteEntry=true;
  }
  searchShows(search)
  {
    console.log(search);
  }
}
