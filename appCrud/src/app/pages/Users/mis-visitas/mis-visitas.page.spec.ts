import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisVisitasPage } from './mis-visitas.page';

describe('MisVisitasPage', () => {
  let component: MisVisitasPage;
  let fixture: ComponentFixture<MisVisitasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisVisitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
