import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CadastrarProdutoComponent } from "./cadastrar-produto/cadastrar-produto.component";
import { ProdutoRoutingModule } from "./produto.route";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ExcluirProdutoComponent} from "./excluir-produto/excluir-produto.component";
import {EditarProdutoComponent} from "./editar-produto/editar-produto.component";
import {ListaProdutoComponent} from "./lista-produto/lista-produto.component";
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt)

@NgModule({
declarations:[
	CadastrarProdutoComponent,
	// ExcluirProdutoComponent,
	// EditarProdutoComponent,
   ListaProdutoComponent
],
imports: [
		CommonModule,
		ProdutoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
],
exports: []
})

export class ProdutoModule{}