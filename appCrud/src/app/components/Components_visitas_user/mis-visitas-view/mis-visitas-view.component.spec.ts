import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MisVisitasViewComponent } from './mis-visitas-view.component';

describe('MisVisitasViewComponent', () => {
  let component: MisVisitasViewComponent;
  let fixture: ComponentFixture<MisVisitasViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MisVisitasViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MisVisitasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
