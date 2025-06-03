import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SitiosViewAdminComponent } from './sitios-view-admin.component';

describe('SitiosViewAdminComponent', () => {
  let component: SitiosViewAdminComponent;
  let fixture: ComponentFixture<SitiosViewAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SitiosViewAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SitiosViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
