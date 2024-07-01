import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CadastrarProdutoComponent } from "./cadastrar-produto/cadastrar-produto.component";

const produtoRouterConfig: Routes = [
	{ path: '', component: CadastrarProdutoComponent }
  
];

@NgModule({
	imports: [
		RouterModule.forChild(produtoRouterConfig)
	],
	exports: [RouterModule]
})
export class ProdutoRoutingModule {}

