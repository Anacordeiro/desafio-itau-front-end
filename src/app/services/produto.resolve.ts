import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {ProdutoService} from './produtos.service';
import {Produto} from '../produto/models/produtos.model';

@Injectable()
export class ProdutoResolve implements Resolve<Produto> {

    constructor(private produtoService: ProdutoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.produtoService.obterPorId(route.params['id']);
    }
}