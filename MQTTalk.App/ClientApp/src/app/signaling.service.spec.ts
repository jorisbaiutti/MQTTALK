import { TestBed } from '@angular/core/testing';

import { SignalingService } from './signaling.service';

describe('SignalingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignalingService = TestBed.get(SignalingService);
    expect(service).toBeTruthy();
  });
});
