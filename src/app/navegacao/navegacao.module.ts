import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MenuComponent } from "./menu/menu.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { CardProdutoComponent } from "../produto/card-produto/card-produto.component";
import { NotFoundComponent } from './not-found/not-found.component';
import { ProdutoService } from "../services/produtos.service";
import {FormsModule} from "@angular/forms";


@NgModule({
	declarations: [
		MenuComponent,
    HomeComponent,
    FooterComponent,
		CardProdutoComponent,
  	NotFoundComponent
	],
	imports: [
		RouterModule,
		CommonModule,
		FormsModule
	],
	exports: [
		RouterModule,
		MenuComponent,
    HomeComponent,
    FooterComponent,
		NotFoundComponent
	],
	providers: [
		ProdutoService
	]

}) 

export class NavegacaoModule{}