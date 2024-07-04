import { Component, OnInit } from '@angular/core';

import { ProdutoService } from '../../services/produtos.service';
import { Produto } from '../models/produtos.model';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
})
export class ListaProdutoComponent implements OnInit{

  constructor(private produtoService: ProdutoService){

  }

  public produtos: Produto[];

  ngOnInit(): void{
    this.retornaProdutos();
  }
  ngAfterViewInit(): void{
    this.retornaProdutos();
  }
  retornaProdutos(){
      this.produtoService.obterListaProdutos().then(
        produtos => {
          this.produtos = produtos
        }
      );
  }

  
}
