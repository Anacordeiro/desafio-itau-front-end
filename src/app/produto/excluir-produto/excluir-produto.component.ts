import { Component } from '@angular/core';
import { Produto } from '../models/produtos.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ProdutoService } from 'src/app/services/produtos.service';


@Component({
  selector: 'app-excluir-produto',
  templateUrl: './excluir-produto.component.html',
})
  export class ExcluirProdutoComponent {

  produto: Produto;

  constructor ( private produtoService: ProdutoService,
      private route: ActivatedRoute,
      private router: Router,
      private toastr: ToastrService
  ){}


  ngOnInit() {
    this.route.params
      .subscribe(params => {
       this.produto = this.produtoService.obterPorId(params['id']);
    })
}

  public excluirProduto() {
    this.produtoService.excluirProduto((this.produto.id).toString())
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Produto excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/lista-produtos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}
