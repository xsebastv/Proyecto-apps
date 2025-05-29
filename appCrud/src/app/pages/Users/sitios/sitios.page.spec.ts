import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SitiosPage } from './sitios.page';

describe('SitiosPage', () => {
  let component: SitiosPage;
  let fixture: ComponentFixture<SitiosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SitiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
