# DesafioItauFrontEnd

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Development server

Execute `ng serve` para um servidor de desenvolvimento. Navegue até `http://localhost:4200/`. O aplicativo será recarregado automaticamente se você alterar algum dos arquivos de origem.

## Code scaffolding

Execute `ng generate component component-name` para gerar um novo componente. Você também pode usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Execute `ng build` para construir o projeto. Os artefatos de construção serão armazenados no diretório `dist/`.

## Running unit tests

Execute `ng test` para executar os testes de unidade via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Execute `ng e2e` para executar os testes ponta a ponta através de uma plataforma de sua escolha. Para usar este comando, você precisa primeiro adicionar um pacote que implemente recursos de teste ponta a ponta.

## Further help

Para obter mais ajuda sobre o Angular CLI, use `ng help` ou confira o[Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Configuração do Ambiente Local

//////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// DOCKER /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

Instalação DOCKER:
- Instalar o Docker através do link: https://docs.docker.com/get-docker/

//////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// LOCALSTACK /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

Instalação LOCALSTACK:

(Caso possua homebrew)
    - brew install localstack 
(Caso possua PIP)
    -  python3 -m pip install --upgrade localstack 
(Caso Linux)
    - curl -Lo localstack-cli-3.5.0-linux-amd64-onefile.tar.gz \
    https://github.com/localstack/localstack-cli/releases/download/v3.5.0/localstack-cli-3.5.0-linux-amd64-onefile.tar.gz

Executar o localstack: 
	localstack start -d (o Comando -d faz um detach no terminal)

//////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// AWS CLI LOCAL /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

Instalação AWS:
    (MAC) - brew install awscli
    (Linux) - curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
    (Windows) - msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

Iniciar Configuração Local:
    - aws configure
    - cd .aws
          va até a pasta .aws no arquivo config e adicione:
            "[profile localstack]
            endpoint_url=http://localhost:4566
            output = json
            region = sa-east-1"
    Na mesma pasta crie um arquivo credentials
    - touch credentials
    - Adicionar seguintes informações: (pode utilizar qualquer valor)
         "[localstack]
           aws_access_key_id=desafioitau
           aws_secret_access_key=desafioitau"


Configuração Container Dynamo Localstack

Executando container docker com DynamoDB, Cloudwatch e S3 configurados (é possivel realizar essa configução no dashboard do localstack)

docker run --hostname=bb9c77904541 --mac-address=02:42:ac:11:00:02 --env=LOCALSTACK_AUTH_TOKEN= --env=DOCKER_HOST=unix:///var/run/docker.sock --env=DISABLE_CORS_CHECKS=1 --env=EXTRA_CORS_ALLOWED_ORIGINS=http://localhost:4200 --env=EXTRA_CORS_ALLOWED_HEADERS=x-api-key --env=PATH=/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/jvm/java-11/bin --env=LANG=C.UTF-8 --env=GPG_KEY=A035C8C19219BA821ECEA86B64E628F8D684696D --env=PYTHON_VERSION=3.11.9 --env=PYTHON_PIP_VERSION=24.0 --env=PYTHON_SETUPTOOLS_VERSION=65.5.1 --env=PYTHON_GET_PIP_URL=https://github.com/pypa/get-pip/raw/dbf0c85f76fb6e1ab42aa672ffca6f0a675d9ee4/public/get-pip.py --env=PYTHON_GET_PIP_SHA256=dfe9fd5c28dc98b5ac17979a953ea550cec37ae1b47a5116007395bfacff2ab9 --env=JAVA_HOME=/usr/lib/jvm/java-11 --env=LD_LIBRARY_PATH=/usr/lib/jvm/java-11/lib:/usr/lib/jvm/java-11/lib/server --env=USER=localstack --env=PYTHONUNBUFFERED=1 --env=LOCALSTACK_BUILD_DATE=2024-07-01 --env=LOCALSTACK_BUILD_GIT_HASH=90895a433 --env=LOCALSTACK_BUILD_VERSION=3.5.1.dev --volume=/var/run/docker.sock:/var/run/docker.sock --volume=/tmp/localstack/volume:/var/lib/localstack --volume=/var/lib/localstack --network=bridge --workdir=/opt/code/localstack/ -p 443:443 -p 4510:4510 -p 4511:4511 -p 4512:4512 -p 4513:4513 -p 4514:4514 -p 4515:4515 -p 4516:4516 -p 4517:4517 -p 4518:4518 -p 4519:4519 -p 4520:4520 -p 4521:4521 -p 4522:4522 -p 4523:4523 -p 4524:4524 -p 4525:4525 -p 4526:4526 -p 4527:4527 -p 4528:4528 -p 4529:4529 -p 4530:4530 -p 4531:4531 -p 4532:4532 -p 4533:4533 -p 4534:4534 -p 4535:4535 -p 4536:4536 -p 4537:4537 -p 4538:4538 -p 4539:4539 -p 4540:4540 -p 4541:4541 -p 4542:4542 -p 4543:4543 -p 4544:4544 -p 4545:4545 -p 4546:4546 -p 4547:4547 -p 4548:4548 -p 4549:4549 -p 4550:4550 -p 4551:4551 -p 4552:4552 -p 4553:4553 -p 4554:4554 -p 4555:4555 -p 4556:4556 -p 4557:4557 -p 4558:4558 -p 4559:4559 -p 4566:4566 -p 53:53 -p 53:53/udp --restart=no --label='authors=LocalStack Contributors' --label='description=LocalStack Docker image' --label='maintainer=LocalStack Team (info@localstack.cloud)' --runtime=runc -d localstack/localstack:latest

OBS: Importante adicionar as seguintes Envs para evitar que as consultas ao Dynamo sejam bloqueadas pelo CORS (ja estão no script acima):
    - DISABLE_CORS_CHECKS:1
    - EXTRA_CORS_ALLOWED_ORIGINS=http://localhost:4200
    - EXTRA_CORS_ALLOWED_HEADERS=x-api-key 

    Caso queira testar a criação de uma bucket s3 simples no localstack  execute via terminal:
        * aws s3 mb s3://log-alteracoes —profile localstack (criando S3)
        


## Criação tabelas no Dynamo
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


## Inserir produtos  default
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

####  Obs: Validar no localstack se a tabela foi criada na region sa-east-1

## Configuração Cloudwatch

//****** CRIAR CLOUDWATCH LOG GROUP ********//
 
 ## Criar log group
 aws logs create-log-group --log-group-name log-desafio-itau --profile localstack

## Criar Stream
 //******  CRIAR STREAM CLOUDWATCH LOGS ******// 
 aws logs create-log-stream --log-group-name log-desafio-itau --log-stream-name stream-desafio-itau --profile localstack

 ## Exemplo de inserção de log

 aws logs put-log-events --log-group-name log-desafio-itau --log-stream-name stream-desafio-itau --log-events "[{\"timestamp\": ${timestamp} , \"message\": \"exclusao produto\"}]" --profile localstack