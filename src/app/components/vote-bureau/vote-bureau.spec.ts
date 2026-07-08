import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteBureau } from './vote-bureau';

describe('VoteBureau', () => {
  let component: VoteBureau;
  let fixture: ComponentFixture<VoteBureau>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteBureau],
    }).compileComponents();

    fixture = TestBed.createComponent(VoteBureau);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
