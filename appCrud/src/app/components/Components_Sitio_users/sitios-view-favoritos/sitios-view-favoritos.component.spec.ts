import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SitiosViewFavoritosComponent } from './sitios-view-favoritos.component';

describe('SitiosViewFavoritosComponent', () => {
  let component: SitiosViewFavoritosComponent;
  let fixture: ComponentFixture<SitiosViewFavoritosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SitiosViewFavoritosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SitiosViewFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
