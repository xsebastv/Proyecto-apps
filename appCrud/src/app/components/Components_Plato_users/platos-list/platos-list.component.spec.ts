import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlatosListComponent } from './platos-list.component';

describe('PlatosListComponent', () => {
  let component: PlatosListComponent;
  let fixture: ComponentFixture<PlatosListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlatosListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
