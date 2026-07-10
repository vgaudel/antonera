import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitTableFromApiRest } from './produit-table-from-api-rest';

describe('ProduitTableFromApiRest', () => {
  let component: ProduitTableFromApiRest;
  let fixture: ComponentFixture<ProduitTableFromApiRest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitTableFromApiRest],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitTableFromApiRest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
