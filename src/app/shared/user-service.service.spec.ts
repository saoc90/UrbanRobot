import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { UserServiceService } from './user-service.service';

describe('UserService Service', () => {
  beforeEachProviders(() => [UserServiceService]);

  it('should ...',
      inject([UserServiceService], (service: UserServiceService) => {
    expect(service).toBeTruthy();
  }));
});
