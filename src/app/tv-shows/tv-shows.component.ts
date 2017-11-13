import { Component, OnInit ,OnDestroy } from '@angular/core';
import { UserService } from '.././user.service';
import { Movies } from '../movies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {
  tvShowList:Movies[];
  tvShowList1:Movies[];
  tvShowLanguageList:Movies[];
  errorMessage:string;
  constructor(private userService:UserService,private router:Router) {
      this.userService.logout=true;
      this.userService.login=false;
      this.userService.signup=false;

   }

  ngOnInit() {
    this.getTvShowList();
    this.getTvShowList1();
    this.getTvShowLanguageList();
  }
  getTvShowList()
  {
    this.userService.getTvShowList().subscribe(
        tvShowList => this.tvShowList = tvShowList,
        error => this.errorMessage = <any>error
    );
  }
  getTvShowList1()
  {
    this.userService.getTvShowList1().subscribe(
        tvShowList1 => this.tvShowList1 = tvShowList1,
        error => this.errorMessage = <any>error
    );
  }
  getTvShowLanguageList()
  {
    this.userService.getTvShowLanguageList().subscribe(
      tvShowLanguageList => this.tvShowLanguageList = tvShowLanguageList,
      error => this.errorMessage= <any>error
    )
  }

  tvShowGenres(genre)
  {
    console.log(genre);
    let that=this;
    this.userService.getTvShowDetailsByGenre(genre).subscribe(
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
  ngOnDestroy()
  {
    this.userService.logout=false;
    this.userService.login=true;
    this.userService.signup=true;
  }
tvshowLanguage(language)
  {
    console.log(language);
    let that=this;
    this.userService.getTvShowDetailsByLanguage(language).subscribe(
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
