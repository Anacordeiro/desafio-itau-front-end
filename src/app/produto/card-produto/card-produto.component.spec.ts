
import { CardProdutoComponent } from './card-produto.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('CardProdutoComponent', () => {
  let component: CardProdutoComponent;
  let fixture: ComponentFixture<CardProdutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardProdutoComponent]
    });

    fixture = TestBed.createComponent(CardProdutoComponent);
    component = fixture.componentInstance;
  });

  it('Deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

});
