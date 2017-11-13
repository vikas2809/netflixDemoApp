import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-image',
  templateUrl: './welcome-image.component.html',
  styleUrls: ['./welcome-image.component.css']
})
export class WelcomeImageComponent implements OnInit {
movie:boolean=false;
tvShow:boolean=false;
  constructor() {
    if(localStorage.getItem('menu')==='movie')
      this.movie=true;
    if(localStorage.getItem('menu')==='tvShow')
      this.tvShow=true;

  }

  ngOnInit() {
  }

}
