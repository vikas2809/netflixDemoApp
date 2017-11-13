import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMovieTvShowsComponent } from './delete-movie-tv-shows.component';

describe('DeleteMovieTvShowsComponent', () => {
  let component: DeleteMovieTvShowsComponent;
  let fixture: ComponentFixture<DeleteMovieTvShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMovieTvShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMovieTvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
