import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import { Produto } from 'src/app/produto/models/produtos.model';

@Component({
  selector: 'app-card-produto',
  templateUrl: './card-produto.component.html',
})
export class CardProdutoComponent {

  @Input() produto: Produto;
  @Output() status: EventEmitter<any> = new EventEmitter();

  emitirEvento() {
    this.status.emit(this.produto);
  }

}
