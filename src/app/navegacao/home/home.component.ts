import { Component } from '@angular/core';
import {Produto} from 'src/app/models/produtos.model';
import {ProdutoService} from 'src/app/services/produtos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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

      // this.produtoService.
  }

}
