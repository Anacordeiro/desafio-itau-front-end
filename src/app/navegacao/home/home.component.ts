import { Component } from '@angular/core';
import { ProdutoService } from '../../services/produtos.service';
import { Produto } from '../../produto/models/produtos.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private produtoService: ProdutoService ){}
  public produtos: Produto[];


  ngOnInit(): void{
    this.retornaProdutos();
  }


  retornaProdutos(){
      
      this.produtoService.obterListaProdutos().then(
        produtos => {
          this.produtos = produtos;
          console.log(produtos)
        },
      error => console.log(error)
      );

      // this.produtoService.obterProdutos()
      // .subscribe(
      // produtos => {
      //     this.produtos = produtos;
      //     console.log(produtos)
      //   },
      // error => console.log(error)
      // )
      // this.produtoService.
  }

}
