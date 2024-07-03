import { Component } from '@angular/core';
import {Produto} from 'src/app/produto/models/produtos.model';
import { ProdutoService } from '../../services/produtos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private produtoService: ProdutoService, private router: Router,){}
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

  mudarStatus(event: Produto){
    event.estoque = event.estoque++
  }

}
