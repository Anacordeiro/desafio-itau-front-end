import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { ContatoComponent } from './institucional/contato/contato.component';
import { ListaProdutoComponent } from './produto/lista-produto/lista-produto.component';
import { CadastrarProdutoComponent } from './produto/cadastrar-produto/cadastrar-produto.component';
import { ExcluirProdutoComponent } from './produto/excluir-produto/excluir-produto.component';
import { EditarProdutoComponent } from './produto/editar-produto/editar-produto.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'contato', component: ContatoComponent},
  { path: 'produtos',component: ListaProdutoComponent},

  { path: 'cadastrar-produto',       
      loadChildren: () => import('./produto/produto.module')
      .then(m => m.ProdutoModule)},

  { path: 'excluir-produto', component: ExcluirProdutoComponent},
  { path: 'editar-produto', component: EditarProdutoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
