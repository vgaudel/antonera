import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExosMaterial } from './exos-material';

describe('ExosMaterial', () => {
  let component: ExosMaterial;
  let fixture: ComponentFixture<ExosMaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExosMaterial],
    }).compileComponents();

    fixture = TestBed.createComponent(ExosMaterial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
