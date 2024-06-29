import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produtos.service';
import { Produto } from 'src/app/models/produtos.model';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})
export class ListaProdutoComponent implements OnInit{

  constructor(private produtoService: ProdutoService){}

  public produtos: Produto[];

  ngOnInit(): void{
    this.retornaProdutos();
  }


  retornaProdutos(){
    this.produtoService.obterProdutos()
    .subscribe(
     produtos => {
        this.produtos = produtos;
        console.log(produtos)
      },
     error => console.log(error)
    )
    }

}
