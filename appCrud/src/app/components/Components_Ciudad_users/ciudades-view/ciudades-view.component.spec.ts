import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CiudadesViewComponent } from './ciudades-view.component';

describe('CiudadesViewComponent', () => {
  let component: CiudadesViewComponent;
  let fixture: ComponentFixture<CiudadesViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CiudadesViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CiudadesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
