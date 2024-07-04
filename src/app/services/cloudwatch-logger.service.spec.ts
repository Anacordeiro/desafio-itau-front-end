import {CloudwatchLoggerService} from "./cloudwatch-logger.service";


describe('CloudwatchLoggerService', () => {
  let cloudwatchLoggerService: CloudwatchLoggerService;

  beforeEach(() => {
    cloudwatchLoggerService = new CloudwatchLoggerService();
  });

  it('Deve criar a instancia', () => {
    expect(cloudwatchLoggerService).toBeTruthy(); 
  });

  it('Deve enviar um log', () => {
    const message = 'Test message'; 

    cloudwatchLoggerService.putLog(message); // Chama o método putLog com a mensagem de teste

  });
});
