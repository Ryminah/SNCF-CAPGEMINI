import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerAttributComponent } from './layer-attribut.component';

describe('LayerAttributComponent', () => {
  let component: LayerAttributComponent;
  let fixture: ComponentFixture<LayerAttributComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerAttributComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayerAttributComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
