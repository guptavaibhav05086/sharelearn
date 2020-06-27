import { TestBed } from '@angular/core/testing';

import { PrintersGuard } from './printers.guard';

describe('PrintersGuard', () => {
  let guard: PrintersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PrintersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
