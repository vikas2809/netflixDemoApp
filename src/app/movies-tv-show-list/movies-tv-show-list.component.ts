import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '.././user.service';

@Component({
  selector: 'app-movies-tv-show-list',
  templateUrl: './movies-tv-show-list.component.html',
  styleUrls: ['./movies-tv-show-list.component.css']
})
export class MoviesTvShowListComponent implements OnInit {
  showInfoList:any=[];
  constructor(private userService:UserService) {
    this.userService.login=false;
    this.userService.signup=false;
    this.userService.logout=true;
    if(localStorage.getItem('showInfo')!==undefined)
    {
      let tempList=localStorage.getItem('showInfo');
      this.showInfoList=JSON.parse(tempList);
      console.log(this.showInfoList);
    }
   }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.userService.login=true;
    this.userService.signup=true;
    this.userService.logout=false;
  }
}
