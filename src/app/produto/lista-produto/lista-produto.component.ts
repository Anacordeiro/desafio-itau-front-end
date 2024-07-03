import { Component, OnInit } from '@angular/core';

import { ProdutoService } from '../../services/produtos.service';
import { Produto } from 'src/app/produto/models/produtos.model';
@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
})
export class ListaProdutoComponent implements OnInit{

  constructor(private produtoService: ProdutoService){}
  public produtos: Produto[];

  ngOnInit(): void{
    this.retornaProdutos();
  }


  retornaProdutos(){

      // this.produtoService.obterProdutos()
      // .subscribe(
      // produtos => {
      //     this.produtos = produtos;
      //     console.log(produtos)
      //   },
      // error => console.log(error)
      // )

      this.produtoService.testeProduto().then(
        produtos => {
          this.produtos = produtos
        }
      );
  }

  
}
