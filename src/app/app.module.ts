import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContatoComponent } from './institucional/contato/contato.component';
import { APP_BASE_HREF } from '@angular/common';
import { ProdutoService } from './services/produtos.service';
import { ListaProdutoComponent } from './produto/lista-produto/lista-produto.component';
import { HttpClientModule } from '@angular/common/http';
// import { CadastrarProdutoComponent } from './produto/cadastrar-produto/cadastrar-produto.component';
import { ExcluirProdutoComponent } from './produto/excluir-produto/excluir-produto.component';
import { EditarProdutoComponent } from './produto/editar-produto/editar-produto.component';
import { DynamoDBService } from './services/dynamo-db.service';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { ProdutoModule } from './produto/produto.module';

@NgModule({
  declarations: [
    AppComponent,
    ContatoComponent,
    //ListaProdutoComponent,
    // CadastrarProdutoComponent,
    ExcluirProdutoComponent,
   EditarProdutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NavegacaoModule,
    ProdutoModule
  ],
  providers: [
    ProdutoService,
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
