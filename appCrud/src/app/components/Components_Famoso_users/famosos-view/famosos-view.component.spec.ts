import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FamososViewComponent } from './famosos-view.component';

describe('FamososViewComponent', () => {
  let component: FamososViewComponent;
  let fixture: ComponentFixture<FamososViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FamososViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FamososViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
