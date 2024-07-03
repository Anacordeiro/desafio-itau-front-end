import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class DynamoDBService {
  private dynamoDB: AWS.DynamoDB.DocumentClient;

  constructor() {
    AWS.config.update({ region: 'sa-east-1' });
    this.dynamoDB = new AWS.DynamoDB.DocumentClient();
  }

  async obterDadosDaTabela(nomeTabela: string) {
    const params = {
      TableName: nomeTabela
    };

    try {
      const data = await this.dynamoDB.scan(params).promise();
      return data;
    } catch (error) {
      console.error('Erro ao obter dados da tabela:', error);
      return null;
    }
  }
}
