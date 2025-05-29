import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaisesViewComponent } from './paises-view.component';

describe('PaisesViewComponent', () => {
  let component: PaisesViewComponent;
  let fixture: ComponentFixture<PaisesViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PaisesViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaisesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
