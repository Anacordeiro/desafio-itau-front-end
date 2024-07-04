import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProdutoComponent } from './lista-produto.component';
import { ActivatedRoute, Router} from '@angular/router';
import { ProdutoService } from '../../services/produtos.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';

describe('ListaProdutoComponent', () => {
  let component: ListaProdutoComponent;
  let fixture: ComponentFixture<ListaProdutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaProdutoComponent],
     providers: [
       { provide: ActivatedRoute,  useValue: {}},
        ProdutoService,
        FormBuilder,
        Router,
        ToastrService,
      { provide: InjectionToken, useValue: {} }
      ],
    });
    fixture = TestBed.createComponent(ListaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
