import { Component } from '@angular/core';
import { Produto } from '../models/produtos.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from '../../services/produtos.service';

@Component({
  selector: 'app-excluir-produto',
  templateUrl: './excluir-produto.component.html',
})
export class ExcluirProdutoComponent {

  produto: Produto; 

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,   
    private toastr: ToastrService
  ) {
    
    this.produto = this.route.snapshot.data['produto'];
  }

  ngOnInit() {
    this.carregaDados();
  }

  // Carrega os dados do produto a ser excluído
  carregaDados() {
    this.route.params.subscribe(params => {
      this.produtoService.obterPorId(params['id']).then(resultado => {
        this.produto = resultado;
      });
    });
  }

  // Método para excluir o produto
  public excluirProduto() {
    this.produtoService.excluirProduto(this.produto.id);
    this.sucessoExclusao(); 
  }

  // Processa o sucesso da exclusão do produto
  public sucessoExclusao() {
    const toast = this.toastr.success('Produto excluído com sucesso!', 'Até logo :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.goBack(); 
      });
    }
  }

  // Método para tratar falhas no processamento
  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

  // Retorna para a página anterior
  goBack() {
    window.history.back();
  }
}
