# DesafioItauFrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Comandos utilizados para criação de banco de dados



Instalação DOCKER:
- Instalar o Docker através do link: https://docs.docker.com/desktop/install/mac-install/
* docker run --hostname=c4702d09e3ee --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin --network=bridge --restart=no --runtime=runc -d alpine:latest


Instalação LOCALSTACK:

	brew install localstack 
	localstack start -d (liberar terminal)


Instalação AWS:
    - brew install awscli
    - aws configure
    - cd .aws
          va até a pasta .aws no arquivo config adicionar:
            [profile localstack]
            endpoint_url=http://localhost:4566
            output = json
            region = sa-east-1
    Criar um arquivo credentials
    - touch credentials
    - Adicionar seguintes informações:
        -  [localstack]
        - aws_access_key_id=(adicionar qualquer texto)
        - aws_secret_access_key=(adicionar qualquer texto)


Configuração Container Dynamo Localstack

- Adicionar ENV
    - DISABLE_CORS_CHECKS:1
    

    - Adicionar seguintes informações arquivo config:
            - [profile localstack]
            - region = sa-east-1
            - output = json
            - endpoint_url=http://localhost:4566
    - No terminal:
        * aws s3 mb s3://log-alteracoes —profile localstack (criando S3)
        * aws dynamodb create-table \
            --table-name tb_produtos \
            --region sa-east-1 \
            --attribute-definitions \
                AttributeName=id,AttributeType=S \
            --key-schema \
                AttributeName=id,KeyType=HASH \
            --provisioned-throughput \
                ReadCapacityUnits=5,WriteCapacityUnits=5 \
            --table-class STANDARD --profile localstack

Obs: Validar no localstack se a tabela foi criada na region sa-east-1


//** DELETAR PRODUTO **//

aws dynamodb delete-item \
    --table-name "tb_produtos" \
    --key '{"id": {"S": "1"}}' \
    --profile localstack

//** INSERIR PRODUTOS **/

aws dynamodb put-item  --table-name tb_produtos  --item '{ "id": {"S": "1"}, "nome": {"S": "Mouse"},"valor": {"S": "15.90"},"imagem": {"S": "mouse.jpg"},"estoque": {"N": "5"} }' --profile localstack    

aws dynamodb put-item  --table-name tb_produtos  --item '{ "id": {"S": "2"}, "nome": {"S": "Teclado Microsoft"},"valor": {"S": "30.0"},"imagem": {"S": "teclado.jpg"},"estoque": {"N": "2"} }' --profile localstack

aws dynamodb put-item  --table-name tb_produtos  --item '{ "id": {"S": "3"}, "nome": {"S": "Monitor Samsung"},"valor": {"S": "230.0"},"imagem": {"S": "monitor.jpg"},"estoque": {"N": "20"} }' --profile localstack
 
aws dynamodb put-item  --table-name tb_produtos  --item '{ "id": {"S": "4"}, "nome": {"S": "Laptop Asus"},"valor": {"S": "30000.0"},"imagem": {"S": "laptop.jpg"},"estoque": {"N": "8"} }' --profile localstack                  
 
aws dynamodb put-item  --table-name tb_produtos  --item '{ "id": {"S": "5"}, "nome": {"S": "Headset Microsoft"},"valor": {"S": "145.0"},"imagem": {"S": "headset.jpg"},"estoque": {"N": "9"} }' --profile localstack               
 
aws dynamodb put-item  --table-name tb_produtos  --item '{ "id": {"S": "6"}, "nome": {"S": "Webcam Logitech"},"valor": {"S": "245.0"},"imagem": {"S": "webcam.jpg"},"estoque": {"N": "2"} }' --profile localstack                 

aws dynamodb put-item  --table-name tb_produtos  --item '{ "id": {"S": "7"}, "nome": {"S": "Galaxy S10+"},"valor": {"S": "6785.0"},"imagem": {"S": "celular.jpg"} ,"estoque": {"N": "2"}}' --profile localstack

aws dynamodb put-item  --table-name tb_produtos  --item '{ "id": {"S": "8"}, "nome": {"S": "Mousepad Microsoft"},"valor": {"S": "385.0"},"imagem": {"S": "mousepad.jpg"},"estoque": {"N": "5"} }' --profile localstack

aws dynamodb put-item  --table-name tb_produtos  --item '{ "id": {"S": "9"}, "nome": {"S": "Go Pro 8"},"valor": {"S": "560.0"},"imagem": {"S": "gopro.jpg"},"estoque": {"N": "3"} }' --profile localstack

aws dynamodb put-item  --table-name tb_produtos  --item '{ "id": {"S": "10"}, "nome": {"S": "Go Pro 7"},"valor": {"S": "460.0"},"imagem": {"S": "gopro.jpg"},"estoque": {"N": "1"} }' --profile localstack
