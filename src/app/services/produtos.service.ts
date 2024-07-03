import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import * as AWS from "aws-sdk";
import { Produto } from "../produto/models/produtos.model";

@Injectable()
export class ProdutoService {
  novoProduto(produto: Produto) {
    throw new Error('Method not implemented.');
  }

private TABLE_NAME : String =  "tb_produtos"

private dynamoDB: AWS.DynamoDB.DocumentClient;  
private dynamoDBGet : AWS.DynamoDB;  
private AWS_CONFIG = { 
    endpoint: "http://localhost:4566",
    region: 'sa-east-1' ,
    accessKeyId: 'ana',
    secretAccessKey: 'carolina'
    
}


constructor(private http: HttpClient){
    AWS.config.update(this.AWS_CONFIG);    
    this.dynamoDB = new AWS.DynamoDB.DocumentClient();
    this.dynamoDBGet = new AWS.DynamoDB();

}
    protected UrlServiceV1: string = 'http://localhost:3000/';
    

    obterProdutos(): Observable<Produto[]> {
        return this.http.get<Produto[]>(this.UrlServiceV1 + "produtos")
    }

    obterPorId(key: string): Promise<Produto> {
    console.log("ID Produto: " + key);

    const params = {
        TableName: "tb_produtos",
        Key: {
            id: { S: key.toString() },
        },
    };

    return new Promise((resolve, reject) => {
        this.dynamoDBGet.getItem(params, function(err, data) {
            if (err) {
                console.log("Error", err);
                reject(err);
            } else {
                 if (data.Item && data.Item["id"] && data.Item["nome"] && data.Item["valor"]) {
                    const resultado: Produto = {
                        id: data.Item["id"].S,
                        nome: data.Item["nome"].S,
                        valor: data.Item["valor"].S,
                        estoque: parseInt(data.Item["estoque"].N),
                        imagem: data.Item["imagem"].S,
                        imagemBase64: data.Item["imagem"].S
                        // Adicione aqui outros atributos necessários
                    };
                    console.log()
                    resolve(resultado);
                } else {
                    reject("Item retornado do DynamoDB não possui todos os atributos necessários");
                }
            }
        });
    });
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

    async atualizarProduto(produto: Produto): Promise<void> {
    const updateExpression = [];
    const expressionAttributeValues = {};  
  const params = {
        TableName: "tb_produtos",
        Key: {
            "id": produto.id
        },
        UpdateExpression: "SET nome = :n, valor = :v, estoque = :e",
        ExpressionAttributeValues: {
            ":n": produto.nome,
            ":v": produto.valor,
            ":e": produto.estoque            
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        const data = await this.dynamoDB.update(params).promise();
        console.log("Produto atualizado com sucesso:", data);
    } catch (err) {
        console.error("Erro ao atualizar produto:", err);
        throw err;
    }
    }

    async excluirProduto(id: string): Promise<void> {
      const params = {
          TableName: "tb_produtos",
          Key: {
              "id": id
          }
      };

      try {
          await this.dynamoDB.delete(params).promise();
          console.log("Produto excluído com sucesso");
      } catch (err) {
          console.error("Erro ao excluir produto:", err);
          throw err;
      }
    }
}