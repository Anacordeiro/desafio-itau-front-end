import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import {Produto} from 'src/app/produto/models/produtos.model';
import {ProdutoService} from 'src/app/services/produtos.service';

@Component({
  selector: 'app-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.css']
})
export class CardProdutoComponent {

  @Input() produto: Produto;
  @Output() status: EventEmitter<any> = new EventEmitter();

  emitirEvento() {
    this.status.emit(this.produto);
  }

}
