import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProdutoService} from 'src/app/services/produtos.service';
import {Produto} from '../models/produtos.model';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent {

  produto: Produto;

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService){

  }


  ngOnInit() {
    this.route.params
      .subscribe(params => {
       this.produto = this.produtoService.obterPorId(params['id']);
    })
  }

  editarProduto() {
    // if (this.produtoForm.dirty && this.produtoForm.valid) {
  }

}
