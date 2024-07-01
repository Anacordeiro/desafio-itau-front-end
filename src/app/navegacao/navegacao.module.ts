import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MenuComponent } from "./menu/menu.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import {CardProdutoComponent} from "../produto/card-produto/card-produto.component";

@NgModule({
	declarations: [
		MenuComponent,
    HomeComponent,
    FooterComponent,
		CardProdutoComponent
	],
	imports: [
		CommonModule,
		RouterModule
	],
	exports: [
		MenuComponent,
    HomeComponent,
    FooterComponent
	]

}) 

export class NavegacaoModule{}