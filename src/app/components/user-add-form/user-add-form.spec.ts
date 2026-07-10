import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddForm } from './user-add-form';

describe('UserAddForm', () => {
  let component: UserAddForm;
  let fixture: ComponentFixture<UserAddForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddForm],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAddForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
