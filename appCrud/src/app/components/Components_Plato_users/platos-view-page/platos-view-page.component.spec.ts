import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlatosViewPageComponent } from './platos-view-page.component';

describe('PlatosViewPageComponent', () => {
  let component: PlatosViewPageComponent;
  let fixture: ComponentFixture<PlatosViewPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlatosViewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatosViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
