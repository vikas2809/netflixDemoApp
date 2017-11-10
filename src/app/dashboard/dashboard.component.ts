import { Component, OnInit ,OnDestroy } from '@angular/core';
import { UserService } from '.././user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService:UserService) {
    this.userService.logout=true;
    this.userService.login=false;
    this.userService.signup=false;
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.userService.logout=false;
    this.userService.login=true;
    this.userService.signup=true;
  }
}
