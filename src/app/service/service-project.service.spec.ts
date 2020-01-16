import { TestBed } from '@angular/core/testing';

import { ServiceProjectService } from './service-project.service';

describe('ServiceProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceProjectService = TestBed.get(ServiceProjectService);
    expect(service).toBeTruthy();
  });
});
