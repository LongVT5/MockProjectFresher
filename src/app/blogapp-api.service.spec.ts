import { TestBed } from '@angular/core/testing';

import { BlogappAPIService } from './blogapp-api.service';

describe('BlogappAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogappAPIService = TestBed.get(BlogappAPIService);
    expect(service).toBeTruthy();
  });
});
