import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtivComponent } from './ptiv.component';


describe('PtivComponent', () => {
  let component: PtivComponent;
  let fixture: ComponentFixture<PtivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
