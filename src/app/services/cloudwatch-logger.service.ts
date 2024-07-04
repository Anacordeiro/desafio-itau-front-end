import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { InputLogEvent, PutLogEventsRequest } from 'aws-sdk/clients/cloudwatchlogs';

@Injectable({
  providedIn: 'root'
})
export class CloudwatchLoggerService {
  private logger: AWS.CloudWatchLogs; 
  private request: PutLogEventsRequest; 
  private AWS_CONFIG = { 
    endpoint: "http://localhost:4566", // Endpoint do Localstack
    region: 'sa-east-1' , // Região da AWS
    accessKeyId: 'desafioitau', 
    secretAccessKey: 'desafioitau' 
  };

  constructor() {
    AWS.config.update(this.AWS_CONFIG); 
    this.logger = new AWS.CloudWatchLogs(); 
    this.request = {
      logGroupName: "log-desafio-itau", // Nome do grupo de log
      logStreamName: "stream-desafio-itau", // Nome do stream de log
      logEvents: [] // Array para armazenar eventos de log
    };
  }

  public putLog(message: string){    
    let inputLogItem: InputLogEvent = {
      timestamp: Date.now(), 
      message: message 
    };
    
    this.request.logEvents = [inputLogItem]; // Atribui o evento de log à requisição
    
    this.logger.putLogEvents(this.request, function(err, data) {
      if (err) {
        console.log(err, err.stack); 
      }
      else{ 
        console.log(data); 
      }
    });
  }
}
