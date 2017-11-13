import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesTvShowListDetailsComponent } from './movies-tv-show-list-details.component';

describe('MoviesTvShowListDetailsComponent', () => {
  let component: MoviesTvShowListDetailsComponent;
  let fixture: ComponentFixture<MoviesTvShowListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesTvShowListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesTvShowListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
