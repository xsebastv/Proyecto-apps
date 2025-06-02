import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FavoritosListComponent } from './favoritos-list.component';

describe('FavoritosListComponent', () => {
  let component: FavoritosListComponent;
  let fixture: ComponentFixture<FavoritosListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FavoritosListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
