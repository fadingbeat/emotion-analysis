import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { currentRouteGuard } from './current-route.guard';

describe('currentRouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => currentRouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
