import { Injectable } from "@angular/core";

import * as AWS from "aws-sdk";
import { Produto } from "../produto/models/produtos.model";
import { CloudwatchLoggerService } from "./cloudwatch-logger.service";

@Injectable()
export class ProdutoService {
    // Configurações do serviço DynamoDB e AWS
    private dynamoDB: AWS.DynamoDB.DocumentClient;
    private dynamoDBGet: AWS.DynamoDB;
    private AWS_CONFIG = { 
        endpoint: "http://localhost:4566",
        region: 'sa-east-1',
        accessKeyId: 'desafioitau',
        secretAccessKey: 'desafioitau'  
    };

    constructor(        
        private cloudwatchLoggerService: CloudwatchLoggerService
    ) {
        // Atualização das configurações da AWS
        AWS.config.update(this.AWS_CONFIG);    
        this.dynamoDB = new AWS.DynamoDB.DocumentClient();
        this.dynamoDBGet = new AWS.DynamoDB();
    }


    
    obterPorId(key: string): Promise<Produto> {
        // Construção dos parâmetros para a busca
        const params = {
            TableName: "tb_produtos",
            Key: {
                id: { S: key.toString() },
            },
        };

        return new Promise((resolve, reject) => {
            // Busca do item no DynamoDB e tratamento de erros e sucesso
            this.dynamoDBGet.getItem(params, function(err, data) {
                if (err) {
                    console.log("Error", err);
                    reject(err);
                } else {
                    if (data.Item && data.Item["id"] && data.Item["nome"] && data.Item["valor"]) {
                        // Construção do objeto Produto com os dados retornados
                        const resultado: Produto = {
                            id: data.Item["id"].S!,
                            nome: data.Item["nome"].S!,
                            valor: data.Item["valor"].S!,
                            estoque: parseInt(data.Item["estoque"].N!),
                            imagem: data.Item["imagem"].S!,
                            imagemBase64: data.Item["imagem"].S!
                        };
                        resolve(resultado);
                    } else {
                        reject("Item retornado do DynamoDB não possui todos os atributos necessários");
                    }
                }
            });
        });
    }

    // Método para obter a lista de todos os produtos
    async obterListaProdutos(): Promise<Produto[]>{
        const params = {
            TableName: "tb_produtos"
        };

        // Execução da operação de escaneamento da tabela e retorno dos itens como Produto[]
        const data = await this.dynamoDB.scan(params).promise();        
        return data.Items as Produto[];
    }

    // Método para adicionar um produto ao DynamoDB
    async adicionarProduto(produto: Produto): Promise<void> {
        var params = {
            TableName: "tb_produtos",
            Item: produto
        };

        // Inserção do produto na tabela e tratamento de erros
        const data = await this.dynamoDB.put(params).promise();    
            if(data.$response.error){
                console.log("Erro", data.$response.error);
                this.cloudwatchLoggerService.putLog("Erro: "+ data.$response.error);
            } else {        
                const logMessageInclusao = `Novo produto ${produto.nome} adicionado com ID ${produto.id}. Estoque: ${produto.estoque}, Valor: ${produto.valor}, Imagem: ${produto.imagem}`;
                this.cloudwatchLoggerService.putLog(logMessageInclusao);
                console.log(logMessageInclusao, data);
            }
        }

    // Método para atualizar um produto no DynamoDB
    async atualizarProduto(produto: Produto): Promise<void> {
        // Parâmetros para atualização do produto
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
            // Log da atualização bem-sucedida  
            const logMessage = `Produto ${produto.nome} com ID ${produto.id} atualizado com sucesso. Estoque: ${produto.estoque}, Valor: ${produto.valor}, Imagem: ${produto.imagem}`;

            this.cloudwatchLoggerService.putLog(logMessage);
            console.log("Produto atualizado com sucesso:", data);
        } catch (err) {
            console.error("Erro ao atualizar produto:", err);
            throw err;
        }
    }

    // Método para excluir um produto do DynamoDB
    async excluirProduto(id: string): Promise<void> {
        const params = {
            TableName: "tb_produtos",
            Key: {
                "id": id
            }
        };

        try {
            await this.dynamoDB.delete(params).promise();
            const logMessageExclusao = `Produto  com ID ${id} excluído com sucesso.`;
            console.log(logMessageExclusao);
            this.cloudwatchLoggerService.putLog(logMessageExclusao);

        } catch (err) {
            console.error("Erro ao excluir produto:", err);
            this.cloudwatchLoggerService.putLog("Erro ao excluir produto: "+ err);
            throw err;
        }
    }
}
