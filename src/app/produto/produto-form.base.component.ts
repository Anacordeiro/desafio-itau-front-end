import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { FormBaseComponent } from '../base-components/form-base.component';
import { Produto } from './models/produtos.model';
import {DisplayMessage, GenericValidator, ValidationMessages} from '../utils/generic-form-validation';

export abstract class ProdutoBaseComponent extends FormBaseComponent {
    
    produto: Produto = {
    id: '',
    nome: "",
    valor: null,
    estoque: null,
    imagem: null,
    imagemBase64: ''
  };
    errors: any[] = [];
    produtoForm: FormGroup;

  override validationMessages: ValidationMessages;
  override genericValidator: GenericValidator;
  override displayMessage: DisplayMessage = {};

    constructor() {
        super();

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
            },
            imagem: {
              required: 'A imagem do produto é requerida'
            }
      };

        this.genericValidator = new GenericValidator(this.validationMessages)
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.produtoForm);
    }
}