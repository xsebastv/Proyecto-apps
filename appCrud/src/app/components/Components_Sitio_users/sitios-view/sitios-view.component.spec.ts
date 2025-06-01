import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SitiosViewComponent } from './sitios-view.component';

describe('SitiosViewComponent', () => {
  let component: SitiosViewComponent;
  let fixture: ComponentFixture<SitiosViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SitiosViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SitiosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
