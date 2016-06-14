import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { AdminServiceService } from './admin-service.service';

describe('AdminService Service', () => {
  beforeEachProviders(() => [AdminServiceService]);

  it('should ...',
      inject([AdminServiceService], (service: AdminServiceService) => {
    expect(service).toBeTruthy();
  }));
});
