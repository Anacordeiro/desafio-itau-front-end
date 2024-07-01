import { Component, Input } from '@angular/core';
import {Produto} from 'src/app/models/produtos.model';
import {ProdutoService} from 'src/app/services/produtos.service';

@Component({
  selector: 'app-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.css']
})
export class CardProdutoComponent {

@Input() produto: Produto

}
