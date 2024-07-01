import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProdutoAppComponent } from "./produto.app.component";
import { ListaProdutoComponent } from "./lista-produto/lista-produto.component";
import { ExcluirProdutoComponent } from "./excluir-produto/excluir-produto.component";
import { EditarProdutoComponent } from "./editar-produto/editar-produto.component";
import { CadastrarProdutoComponent } from "./cadastrar-produto/cadastrar-produto.component";

const produtoRouterConfig: Routes = [
	{ 
		path: '', component: ProdutoAppComponent,
		children: [
			{ path: 'lista-produtos', component: ListaProdutoComponent},
	  	{ path: 'excluir-produto/:id', component: ExcluirProdutoComponent},
	  	{ path: 'editar-produto/:id', component: EditarProdutoComponent},
			{ path: 'cadastrar-produto', component: CadastrarProdutoComponent}
	]}
  
];

@NgModule({
	imports: [
		RouterModule.forChild(produtoRouterConfig)
	],
	exports: [RouterModule]
})
export class ProdutoRoutingModule {}

