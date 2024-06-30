import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { ContatoComponent } from './institucional/contato/contato.component';
import { ListaProdutoComponent } from './produtos/lista-produto/lista-produto.component';
import { CadastrarProdutoComponent } from './produtos/cadastrar-produto/cadastrar-produto.component';
import { ExcluirProdutoComponent } from './produtos/excluir-produto/excluir-produto.component';
import { EditarProdutoComponent } from './produtos/editar-produto/editar-produto.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'contato', component: ContatoComponent},
  { path: 'produtos', component: ListaProdutoComponent},
  { path: 'cadastrar-produto', component: CadastrarProdutoComponent},
  { path: 'excluir-produto', component: ExcluirProdutoComponent},
  { path: 'editar-produto', component: EditarProdutoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
