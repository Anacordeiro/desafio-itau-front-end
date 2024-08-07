import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ProdutoService } from '../../services/produtos.service';
import { ProdutoBaseComponent } from '../produto-form.base.component';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
})
export class EditarProdutoComponent extends ProdutoBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  editarForm: FormGroup; 
  formResult: string = ''; 

  constructor(
    private route: ActivatedRoute, 
    private produtoService: ProdutoService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService ) {
      super(); 

      
      this.produto = this.route.snapshot.data['produto'];
  }

  ngOnInit() {
    this.carregaDados(); 
    this.validaFormulario();
    this.preencherForm();
  }

  // Carrega os dados do produto a ser editado
  carregaDados() {
    this.route.params.subscribe(params => {
      this.produtoService.obterPorId(params['id']).then(resultado => {
        this.produto = resultado;
      });
    });
  }

  // Preenche o formulário com os dados do produto
  preencherForm() {
    this.editarForm.patchValue({
      id: this.produto.id,
      nome: this.produto.nome,
      estoque: this.produto.estoque,
      valor: this.produto.valor,
      imagem: this.produto.imagem
    });
  }

  // Após a inicialização dos elementos de formulários, adiciona validação e eventos de blur
  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.editarForm);
    });

    this.validaFormulario(); // Valida o formulário
  }

  // Valida o formulário de edição
  validaFormulario() {
    this.editarForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      valor: ['', Validators.required],
      estoque: ['', Validators.required],
      imagem: ['']
    });
  }

  // Atualiza o produto editado
  editarProduto() {
    this.produtoService.atualizarProduto(this.produto);
    this.processarSucesso();
  }

  // Processa o arquivo selecionado para exibir a imagem
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.produto.imagemBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Processa o sucesso da edição do produto
  processarSucesso() {
    this.editarForm.reset();
    let toast = this.toastr.success('Produto editado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.goBack();
      });
    }
  }

  // Retorna para a página anterior
  goBack() {
    window.history.back();
  }
}
