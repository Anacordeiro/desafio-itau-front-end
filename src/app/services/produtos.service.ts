import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Produto } from "../produto/models/produtos.model.js";
import { Observable, catchError } from "rxjs";

@Injectable()
export class ProdutoService {

produtos: Produto[];

constructor(private http: HttpClient){

this.produtos = [{
            id: 1,
            nome: 'Teste',
            estoque: 20,
            valor: 100,
            imagem: 'celular.jpg'
          },
          {
            id: 2,
            nome: 'Teste 2',
            estoque: 20,
            valor: 200,
            imagem: 'gopro.jpg'
          },
          {
            id: 3,
            nome: 'Teste 3',
            estoque: 30,
            valor: 300,
            imagem: 'laptop.jpg'
          },
          {
            id: 4,
            nome: 'Teste 4',
            estoque: 32,
            valor: 400,
            imagem: 'mouse.jpg'
          },
          {
            id: 5,
            nome: 'Teste 5',
            estoque: 29,
            valor: 500,
            imagem: 'teclado.jpg'
          },
          {
            id: 6,
            nome: 'Teste 6',
            estoque: 2,
            valor: 600,
            imagem: 'headset.jpg'
          }];   
    }

    protected UrlServiceV1: string = "http://localhost:3000/";
    

    obterProdutos(): Observable<Produto[]> {
        return this.http.get<Produto[]>(this.UrlServiceV1 + "produtos")
    }

    obterPorId(id: number): Produto {
        return this.produtos.find(produto => produto.id == id);
    }

    // obterPorId(id: string): Observable<Produto> {
    // return this.http
    //     .get<Produto>(this.UrlServiceV1 + "produtos/" + id)
        
    // }


}