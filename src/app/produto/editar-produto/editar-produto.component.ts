import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ProdutoService } from 'src/app/services/produtos.service';
import { Produto } from '../models/produtos.model';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
})
export class EditarProdutoComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];


  produto: Produto;
  editarForm: FormGroup;
  formResult: string = '';


  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(
    private route: ActivatedRoute, 
    private produtoService: ProdutoService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService ){
  
      this.validationMessages = {
        nome: {
          required: 'O nome do produto é requerido',
          minlength: 'O nome precisa ter no mínimo 4 caracteres',
          maxlength: 'O nome precisa ter no máximo 15 caracteres'
        },
        valor: {
          required: 'O valor do produto é requerido'
        },
        estoque: {
          required: 'A quantidade de produtos em estoque é requerida'
        }
      };

      this.genericValidator = new GenericValidator(this.validationMessages);
  }


  ngOnInit() {

    this.route.params
      .subscribe(params => {
       this.produto = this.produtoService.obterPorId(params['id']);
    })

    this.validaFormulario();
    this.preencherForm();

  }

  preencherForm() {

    this.editarForm.patchValue({
      id: this.produto.id,
      nome: this.produto.nome,
      estoque: this.produto.estoque,
      valor: this.produto.valor,
      imagem: this.produto.imagem
    });
  }


  ngAfterViewInit(): void {
  let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.editarForm);
    })

    this.validaFormulario();
  }

  validaFormulario(){
    this.editarForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      valor: ['', Validators.required],
      estoque: ['', Validators.required],
      imagem: ['']
    });
  }

  salvar() {
    // fazer comunicacao com backend
    this.router.navigate(['/produtos/lista-produtos']);
  }

  editarProduto() {
    console.log('novos dados' + this.produto) 
    if (this.editarForm.dirty && this.editarForm.valid) {
      this.produto = Object.assign({}, this.produto, this.editarForm.value);

      this.produto.valor = CurrencyUtils.StringParaDecimal(this.produto.valor);

      this.produtoService.atualizarProduto(this.produto)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) }
          
        );

    }
    
  }

  processarSucesso(response: any) {
    this.editarForm.reset();
    let toast = this.toastr.success('Produto editado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/lista-produtos']);
      });
    }
  }


}
