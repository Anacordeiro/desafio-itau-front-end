import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContatoComponent } from './institucional/contato/contato.component';
import { ProdutoService } from './services/produtos.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NavegacaoModule } from './navegacao/navegacao.module';
import { ProdutoModule } from './produto/produto.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    ContatoComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NavegacaoModule,
    ProdutoModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [
    ProdutoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
