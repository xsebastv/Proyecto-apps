import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CiudadesAdminPage } from './ciudades-admin.page';

describe('CiudadesAdminPage', () => {
  let component: CiudadesAdminPage;
  let fixture: ComponentFixture<CiudadesAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CiudadesAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
