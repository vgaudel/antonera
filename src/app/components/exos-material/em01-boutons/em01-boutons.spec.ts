import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Em01Boutons } from './em01-boutons';

describe('Em01Boutons', () => {
  let component: Em01Boutons;
  let fixture: ComponentFixture<Em01Boutons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Em01Boutons],
    }).compileComponents();

    fixture = TestBed.createComponent(Em01Boutons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
