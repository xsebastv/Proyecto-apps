import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionSitiosPage } from './gestion-sitios.page';

describe('GestionSitiosPage', () => {
  let component: GestionSitiosPage;
  let fixture: ComponentFixture<GestionSitiosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSitiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
