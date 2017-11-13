import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './user.service';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ValidationService } from './validation.service';
import { DatePipe } from '@angular/common';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { MoviesComponent } from './movies/movies.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AddMovieTvShowsComponent } from './add-movie-tv-shows/add-movie-tv-shows.component';
import { DeleteMovieTvShowsComponent } from './delete-movie-tv-shows/delete-movie-tv-shows.component';
import { UpdateMovieTvShowsComponent } from './update-movie-tv-shows/update-movie-tv-shows.component';
import { WelcomeImageComponent } from './welcome-image/welcome-image.component';
import { MoviesTvShowListComponent } from './movies-tv-show-list/movies-tv-show-list.component';
import { MoviesTvShowListDetailsComponent } from './movies-tv-show-list-details/movies-tv-show-list-details.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ControlMessagesComponent,
    DashboardComponent,
    TvShowsComponent,
    MoviesComponent,
    AdminMenuComponent,
    AddMovieTvShowsComponent,
    DeleteMovieTvShowsComponent,
    UpdateMovieTvShowsComponent,
    WelcomeImageComponent,
    MoviesTvShowListComponent,
    MoviesTvShowListDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routes
  ],
  providers: [UserService,ValidationService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
