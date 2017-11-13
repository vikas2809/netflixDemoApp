import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMovieTvShowsComponent } from './update-movie-tv-shows.component';

describe('UpdateMovieTvShowsComponent', () => {
  let component: UpdateMovieTvShowsComponent;
  let fixture: ComponentFixture<UpdateMovieTvShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMovieTvShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMovieTvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
