import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieTvShowsComponent } from './add-movie-tv-shows.component';

describe('AddMovieTvShowsComponent', () => {
  let component: AddMovieTvShowsComponent;
  let fixture: ComponentFixture<AddMovieTvShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMovieTvShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovieTvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
