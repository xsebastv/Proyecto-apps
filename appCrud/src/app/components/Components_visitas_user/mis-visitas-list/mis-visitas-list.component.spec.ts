import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MisVisitasListComponent } from './mis-visitas-list.component';

describe('MisVisitasListComponent', () => {
  let component: MisVisitasListComponent;
  let fixture: ComponentFixture<MisVisitasListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MisVisitasListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MisVisitasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
