import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlatosViewComponent } from './platos-view.component';

describe('PlatosViewComponent', () => {
  let component: PlatosViewComponent;
  let fixture: ComponentFixture<PlatosViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlatosViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
