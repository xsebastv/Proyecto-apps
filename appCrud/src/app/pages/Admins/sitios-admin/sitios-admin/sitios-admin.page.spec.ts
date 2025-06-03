import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SitiosAdminPage } from './sitios-admin.page';

describe('SitiosAdminPage', () => {
  let component: SitiosAdminPage;
  let fixture: ComponentFixture<SitiosAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SitiosAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
