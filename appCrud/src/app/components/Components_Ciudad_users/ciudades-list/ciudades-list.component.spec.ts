import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CiudadesListComponent } from './ciudades-list.component';

describe('CiudadesListComponent', () => {
  let component: CiudadesListComponent;
  let fixture: ComponentFixture<CiudadesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CiudadesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CiudadesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
