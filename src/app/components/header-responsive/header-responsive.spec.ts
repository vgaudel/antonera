import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderResponsive } from './header-responsive';

describe('HeaderResponsive', () => {
  let component: HeaderResponsive;
  let fixture: ComponentFixture<HeaderResponsive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderResponsive],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderResponsive);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
