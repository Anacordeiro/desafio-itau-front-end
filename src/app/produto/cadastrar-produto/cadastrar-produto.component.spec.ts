import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarProdutoComponent } from './cadastrar-produto.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ProdutoService} from '../../services/produtos.service';
import {FormBuilder} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {InjectionToken} from '@angular/core';

describe('CadastrarProdutoComponent', () => {
  let component: CadastrarProdutoComponent;
  let fixture: ComponentFixture<CadastrarProdutoComponent>;

const mockActivatedRoute = {
  snapshot: {
    data: {
      produto: { 
      "id": "4",
      "nome": "Laptop Asus",
      "valor": 3000,
      "imagem": "laptop.jpg",
      "imagemBase64": "imagemBase64",
      "estoque": 23}
    }
  }
};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarProdutoComponent],
     providers: [
       { provide: ActivatedRoute,  useValue: {}},
        ProdutoService,
        FormBuilder,
        Router,
        ToastrService,
      { provide: InjectionToken, useValue: {mockActivatedRoute} }
      ],
      imports: [ToastrModule.forRoot()]

    });
    fixture = TestBed.createComponent(CadastrarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
