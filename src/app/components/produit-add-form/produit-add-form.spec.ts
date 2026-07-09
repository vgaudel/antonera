import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitAddForm } from './produit-add-form';

describe('ProduitAddForm', () => {
  let component: ProduitAddForm;
  let fixture: ComponentFixture<ProduitAddForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitAddForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitAddForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
