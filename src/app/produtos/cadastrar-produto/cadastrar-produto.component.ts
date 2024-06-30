import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { Produto } from 'src/app/models/produtos.model';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef }) formInputElements: ElementRef[];

  cadastroForm: FormGroup;
  produto: Produto;
  formResult: string = '';

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder){
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

  ngOnInit(){
    this.validaFormulario();
  }

  ngAfterViewInit(): void {
  let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    })
  }



  validaFormulario(){
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required, Validators.minLength(4), Validators.maxLength(15)],
      valor: ['', Validators.required],
      estoque: ['', Validators.required]
    });
  }

  adicionarProduto(){
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
      this.produto = Object.assign({}, this.produto, this.cadastroForm.value);
      this.formResult = JSON.stringify(this.cadastroForm.value);
    } 
  }

}
