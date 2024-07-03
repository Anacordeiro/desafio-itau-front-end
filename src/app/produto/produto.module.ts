import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { CadastrarProdutoComponent } from "./cadastrar-produto/cadastrar-produto.component";
import { ProdutoRoutingModule } from "./produto.route";
import { ExcluirProdutoComponent } from "./excluir-produto/excluir-produto.component";
import { EditarProdutoComponent } from "./editar-produto/editar-produto.component";
import { ListaProdutoComponent } from "./lista-produto/lista-produto.component";
import { ProdutoAppComponent } from "./produto.app.component";
import { ProdutoResolve } from "../services/produto.resolve";
import { ProdutoService } from "../services/produtos.service";


registerLocaleData(localePt)

@NgModule({
declarations:[
	 CadastrarProdutoComponent,
	 ExcluirProdutoComponent,
	 EditarProdutoComponent,
   ListaProdutoComponent,
	 ProdutoAppComponent
],
imports: [
		CommonModule,
		ProdutoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
		ProdutoRoutingModule,
		RouterModule,
		HttpClientModule,

],
exports: [],
providers: [
		ProdutoResolve,
		ProdutoService
]
})

export class ProdutoModule{}