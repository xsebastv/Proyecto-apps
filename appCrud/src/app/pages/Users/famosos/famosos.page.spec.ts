import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FamososPage } from './famosos.page';

describe('FamososPage', () => {
  let component: FamososPage;
  let fixture: ComponentFixture<FamososPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FamososPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
