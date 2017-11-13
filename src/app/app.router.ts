import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesTvShowListComponent } from './movies-tv-show-list/movies-tv-show-list.component';
import { MoviesTvShowListDetailsComponent } from './movies-tv-show-list-details/movies-tv-show-list-details.component';

export const router:Routes=[
  {path:'', component: HomeComponent },
  {path:'sign', component: SignUpComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'logout', component: HomeComponent},
  {path:'shows', component: TvShowsComponent},
  {path:'movies', component: MoviesComponent},
  {path:'details', component: MoviesTvShowListComponent},
  {path:'showDetails', component: MoviesTvShowListDetailsComponent}
];

export const routes:ModuleWithProviders = RouterModule.forRoot(router);
