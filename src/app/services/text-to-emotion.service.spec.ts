import { TestBed } from '@angular/core/testing';

import { TextToEmotionService } from './text-to-emotion.service';

describe('TextToEmotionService', () => {
  let service: TextToEmotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextToEmotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
