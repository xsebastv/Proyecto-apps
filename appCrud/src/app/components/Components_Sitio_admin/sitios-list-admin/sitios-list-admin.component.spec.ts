import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SitiosListAdminComponent } from './sitios-list-admin.component';

describe('SitiosListAdminComponent', () => {
  let component: SitiosListAdminComponent;
  let fixture: ComponentFixture<SitiosListAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SitiosListAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SitiosListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
