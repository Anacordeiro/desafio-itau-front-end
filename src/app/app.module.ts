import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './navegacao/menu/menu.component';
import { HomeComponent } from './navegacao/home/home.component';
import { FooterComponent } from './navegacao/footer/footer.component';
import { ContatoComponent } from './institucional/contato/contato.component';
import { APP_BASE_HREF } from '@angular/common';
import { ProdutoService } from './services/produtos.service';
import { ListaProdutoComponent } from './produtos/lista-produto/lista-produto.component';
import { HttpClientModule } from '@angular/common/http';
import { CadastrarProdutoComponent } from './produtos/cadastrar-produto/cadastrar-produto.component';
import { ExcluirProdutoComponent } from './produtos/excluir-produto/excluir-produto.component';
import { EditarProdutoComponent } from './produtos/editar-produto/editar-produto.component';
import { DynamoDBService } from './services/dynamo-db.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    ContatoComponent,
    ListaProdutoComponent,
    CadastrarProdutoComponent,
    ExcluirProdutoComponent,
    EditarProdutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProdutoService,
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
