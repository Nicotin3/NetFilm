import { TestBed } from '@angular/core/testing';

import { SingleMovieService } from './single-movie.service';

describe('SingleMovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SingleMovieService = TestBed.get(SingleMovieService);
    expect(service).toBeTruthy();
  });
});
