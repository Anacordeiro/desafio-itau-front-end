import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {DynamoDB} from 'aws-sdk';
import * as AWS from "aws-sdk";
import { Produto } from "../produto/models/produtos.model";

@Injectable()
export class ProdutoService {
  novoProduto(produto: Produto) {
    throw new Error('Method not implemented.');
  }

private TABLE_NAME : String =  "tb_produtos"

private dynamoDB: AWS.DynamoDB.DocumentClient;    
private AWS_CONFIG = { 
    endpoint: "http://localhost:4566",
    region: 'sa-east-1' ,
    accessKeyId: 'ana',
    secretAccessKey: 'carolina'
    
}


constructor(private http: HttpClient){
    AWS.config.update(this.AWS_CONFIG);    
    this.dynamoDB = new AWS.DynamoDB.DocumentClient();

}
    protected UrlServiceV1: string = "http://localhost:3000/";
    

    obterProdutos(): Observable<Produto[]> {
        return this.http.get<Produto[]>(this.UrlServiceV1 + "produtos")
    }

    async testeProduto(): Promise<Produto[]>{

        const params = {
            TableName:  "tb_produtos"
        };

        const data = await this.dynamoDB.scan(params).promise();
        return data.Items as Produto[];

    }

    adicionarProduto(produto: Produto): void{
        var params = {
            TableName:  "tb_produtos",
            Item: produto
        }

        this.dynamoDB.put(params, function (err, data){
            if(err){
                console.log("Erro", err);
            }
            else{
                console.log("Sucesso", data);
            }
        });
    }
}