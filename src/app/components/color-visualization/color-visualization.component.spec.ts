import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorVisualizationComponent } from './color-visualization.component';

describe('ColorVisualizationComponent', () => {
  let component: ColorVisualizationComponent;
  let fixture: ComponentFixture<ColorVisualizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorVisualizationComponent]
    });
    fixture = TestBed.createComponent(ColorVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
