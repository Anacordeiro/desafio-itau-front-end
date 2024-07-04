import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import {Produto} from '../models/produtos.model';


@Component({
  selector: 'app-card-produto',
  templateUrl: './card-produto.component.html',
})
export class CardProdutoComponent {

  @Input() produto: Produto;
  @Output() status: EventEmitter<any> = new EventEmitter();
  component: {id: string; nome: string; valor: string; imagem: string; estoque: number;};

  emitirEvento() {
    this.status.emit(this.produto);
  }

}
