import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLayerComponent } from './info-layer.component';

describe('InfoLayerComponent', () => {
  let component: InfoLayerComponent;
  let fixture: ComponentFixture<InfoLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
