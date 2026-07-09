import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExosPipes } from './exos-pipes';

describe('ExosPipes', () => {
  let component: ExosPipes;
  let fixture: ComponentFixture<ExosPipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExosPipes],
    }).compileComponents();

    fixture = TestBed.createComponent(ExosPipes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
