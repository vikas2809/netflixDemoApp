import { Component, OnInit ,OnDestroy } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { UserService } from '.././user.service';

@Component({
  selector: 'app-movies-tv-show-list-details',
  templateUrl: './movies-tv-show-list-details.component.html',
  styleUrls: ['./movies-tv-show-list-details.component.css']
})
export class MoviesTvShowListDetailsComponent implements OnInit {
  showName:string;
  showInfoDetails:any=[];
  constructor(private router: Router,private route: ActivatedRoute,private userService:UserService) {
    this.userService.signup=false;
    this.userService.login=false;
    this.userService.logout=true;
    this.route.params.subscribe(params => {
      this.showName= params['name'];
   });
   console.log(this.showName);
   this.userService.getMovieDetailByName(this.showName).subscribe(
     function(response)
     {
       // let that=this;
       if(response.status===true&&response.data!==null)
       {
         console.log("movie");
         // this.showInfoDetails=response.data;
         console.log(response);
         localStorage.setItem('ShowInfo',JSON.stringify(response.data));
         console.log(this.showInfoDetails);
         // console.log(that.showInfoDetails);
       }
      // console.log(response);
     });
     this.userService.getTvShowDetailByName(this.showName).subscribe(
         function(response){
           // let that=this;
           if(response.status===true&&response.data!==null)
           {
             console.log("Show");
              localStorage.setItem('ShowInfo',JSON.stringify(response.data))
                  // this.showInfoDetails=response.data;
             console.log(response);
              // console.log(that.showInfoDetails);
              console.log(this.showInfoDetails);
           }
       });
       let tempList=localStorage.getItem('ShowInfo');
       this.showInfoDetails=JSON.parse(tempList);
       console.log(this.showInfoDetails)
   }

  ngOnInit() {

  }
  ngOnDestroy(){
    this.userService.signup=true;
    this.userService.login=true;
    this.userService.logout=false;
  }
}
