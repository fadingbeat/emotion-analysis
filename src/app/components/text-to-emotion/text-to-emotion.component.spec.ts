import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextToEmotionComponent } from './text-to-emotion.component';

describe('TextToEmotionComponent', () => {
  let component: TextToEmotionComponent;
  let fixture: ComponentFixture<TextToEmotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextToEmotionComponent]
    });
    fixture = TestBed.createComponent(TextToEmotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
