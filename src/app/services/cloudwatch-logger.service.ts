import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { InputLogEvent, PutLogEventsRequest } from 'aws-sdk/clients/cloudwatchlogs';

@Injectable({
  providedIn: 'root'
})
export class CloudwatchLoggerService {
  private logger : AWS.CloudWatchLogs;  
  private request: PutLogEventsRequest;
  private AWS_CONFIG = { 
    endpoint: "http://localhost:4566",
    region: 'sa-east-1' ,
    accessKeyId: 'ana',
    secretAccessKey: 'carolina'
    
}
  constructor() { 
    this.logger = new AWS.CloudWatchLogs();    
  }

  public putLog(message: string){

    alert("Chamou putLog");
    this.request.logGroupName = "log-desafio-itau";
    this.request.logStreamName = "stream-desafio-itau";
    let inputLogItem: InputLogEvent;
    // inputLogItem.timestamp = Date.now;
    inputLogItem.message = message;
    this.request.logEvents = [inputLogItem];

    this.logger.putLogEvents(this.request);
  }
}
