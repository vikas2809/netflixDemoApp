import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesTvShowListComponent } from './movies-tv-show-list.component';

describe('MoviesTvShowListComponent', () => {
  let component: MoviesTvShowListComponent;
  let fixture: ComponentFixture<MoviesTvShowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesTvShowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesTvShowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
