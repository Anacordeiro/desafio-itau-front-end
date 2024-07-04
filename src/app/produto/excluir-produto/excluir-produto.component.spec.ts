import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirProdutoComponent } from './excluir-produto.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ProdutoService} from '../../services/produtos.service';
import {FormBuilder} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {InjectionToken} from '@angular/core';

describe('ExcluirProdutoComponent', () => {
  let component: ExcluirProdutoComponent;
  let fixture: ComponentFixture<ExcluirProdutoComponent>;

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
      declarations: [ExcluirProdutoComponent],
     providers: [
       { provide: ActivatedRoute,  useValue: {mockActivatedRoute}},
        ProdutoService,
        FormBuilder,
        Router,
        ToastrService,
      { provide: InjectionToken, useValue: {} }
      ],
      imports: [ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(ExcluirProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
